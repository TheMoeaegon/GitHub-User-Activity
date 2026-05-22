type Event = {
    id: string;
    type: string;
    repo: {
        name: string;
    };
};

let username = process.argv[2];
let url = `https://api.github.com/users/${username}/events`;

let response = await fetch(url);
let data: Event[] = await response.json();

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
