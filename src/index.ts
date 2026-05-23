#!/usr/bin/env node

type Event = {
    id: string;
    type: string;
    repo: {
        name: string;
    };
};

let username = process.argv[2];
let eventType = process.argv[3];
let url = `https://api.github.com/users/${username}/events`;

await main(eventType);

//function declaration
async function getUserEvents(url: string) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            if (response.status == 404) {
                console.log(`user with username ${username} not found`);
                return;
            } else {
                throw new Error("Something went wrong");
            }
        }
        let data: Event[] = await response.json();
        return data;
    } catch (error: unknown) {
        if (Error.isError(error)) {
            console.error(error.message);
            return;
        }
        console.error("Something went wrong");
        return;
    }
}

async function main(eventType: string) {
    let data = await getUserEvents(url);

    if (!data && !Array.isArray(data)) {
        return;
    }
    if (data.length === 0) {
        console.log("No Event for this user");
        return;
    }

    if (eventType) {
        let filteredData = data.filter(
            (e) => e.type.toLocaleLowerCase() == eventType.toLowerCase(),
        );
        handleEvents(filteredData);
        return;
    }

    handleEvents(data);
}

function handleEvents(data: Event[]) {
    for (let event of data) {
        switch (event.type.toLowerCase()) {
            case "createevent":
                console.log(
                    `- Create new Repository name ${event.repo.name.split("/")[1]}`,
                );
                break;
            case "watchevent":
                console.log(`- Starred repo ${event.repo.name.split("/")[1]}`);
                break;
            case "pushevent":
                console.log(`- Pushed new changes to ${event.repo.name}`);
                break;
            case "issueevent":
                console.log(`- Opened a new issue in ${event.repo.name}`);
                break;
            default:
                console.log(
                    `- Performed an action of type ${event.type} in repository ${event.repo.name}`,
                );
        }
    }
}
