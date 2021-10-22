const uaup = require("uaup-js")

const defaultStages = {
    Checking: "Checking For Updates!", // When Checking For Updates.
    Found: "Update Found!", // If an Update is Found.
    NotFound: "No Update Found.", // If an Update is Not Found.
    Downloading: "Downloading...", // When Downloading Update.
    Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
    Cleaning: "Finalizing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
    Launch: "Launching...", // When Launching the Application.
}

const updateOptions = {
    gitRepo: "netode",
    appName: "netode", 
    appExecutableName: "setup.exe",
    gitUsername: "ThijmenGThN",

    appDirectory: "/path/to/application",
    versionFile: "/path/to/version.json",
    
    useGithub: true,
    isGitRepoPrivate: false, 
    gitRepoToken: "abc123",
    tempDirectory: "/tmp",
    forceUpdate: true,
    
    label: null,
    progressBar: null,
    stageTitles: defaultStages,
}

uaup.Update(updateOptions);