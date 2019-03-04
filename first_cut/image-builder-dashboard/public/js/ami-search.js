/*
globals
*/

// Configurable
var fhidUrl = "https://images.cloudpod.apps.ge.com/v1.0/images";
var testmode = 1;
// Function for displaying data

function Card(resp) {
    console.log(resp);
    // storing the data from the AJAX request in the results variable
    var results = JSON.stringify(resp);

    // Creating a paragraph tag with the result details
        var p = $("<p>").text(results);
        // Display on HTML page, in image-view div
        $("#image-view").append(p);
        $("#search").hide();
    }

// Data Pull
function renderDetails(input) {
    // Constructing a queryURL using the animal name
    var queryURL = fhidUrl + "?ImageID=" + input;  // should consider validation & limit
    console.log(queryURL);
    // Performing an AJAX request with the queryURL
    if (testmode){
        var exampleObj =
        {
            "Results": [
                {
                    "ImageID": "e1a0b27f-7d58-43bf-98c1-9391d2b66dca",
                    "Version": "1.2.2.14",
                    "BaseOS": "CentOS",
                    "ReleaseNotes": null,
                    "BuildNotes": {
                        "BuildLog": [
                            "==\u003e amazon-ebs: Prevalidating AMI Name: GE-PCT-Golden-AMI-DRYRUN-2018-01-23-01-05",
                            "    amazon-ebs: Found Image ID: ami-d424b4c2",
                            "==\u003e amazon-ebs: Creating temporary keypair: packer_5a673306-237d-7f04-1431-8cf971c0efbb",
                            "==\u003e amazon-ebs: Launching a source AWS instance...",
                            "==\u003e amazon-ebs: Adding tags to source instance",
                            "    amazon-ebs: Adding tag: \"AMI_Version\": \"1.2.2.14\"",
                            "    amazon-ebs: Adding tag: \"Name\": \"GE-PCT-Golden-AMI-DRYRUN-2018-01-23-01-05\"",
                            "    amazon-ebs: Adding tag: \"OS_Version\": \"CentOS\"",
                            "    amazon-ebs: Adding tag: \"Release\": \"packer 2018-01-23-01-05\"",
                            "    amazon-ebs: Adding tag: \"env\": \"dev\"",
                            "    amazon-ebs: Adding tag: \"uai\": \"uai9999999\"",
                            "    amazon-ebs: Adding tag: \"preserve\": \"true\"",
                            "    amazon-ebs: Instance ID: i-0963cd52cbe3e3aa7",
                            "==\u003e amazon-ebs: Waiting for instance (i-0963cd52cbe3e3aa7) to become ready...",
                            "==\u003e amazon-ebs: Waiting for SSH to become available...",
                            "==\u003e amazon-ebs: Connected to SSH!",
                            "==\u003e amazon-ebs: Provisioning with shell script: /tmp/packer-shell813305446",
                            "    amazon-ebs: \u003cbuild log contents here\u003e",
                            "==\u003e amazon-ebs: Stopping the source instance...",
                            "    amazon-ebs: Stopping instance, attempt 1",
                            "==\u003e amazon-ebs: Waiting for the instance to stop...",
                            "==\u003e amazon-ebs: Creating the AMI: GE-PCT-Golden-AMI-DRYRUN-2018-01-23-01-05",
                            "    amazon-ebs: AMI: ami-de2d1ba4",
                            "==\u003e amazon-ebs: Waiting for AMI to become ready...",
                            "==\u003e amazon-ebs: Adding tags to AMI (ami-de2d1ba4)...",
                            "==\u003e amazon-ebs: Tagging snapshot: snap-088f821a93b7d4ab0",
                            "==\u003e amazon-ebs: Creating AMI tags",
                            "    amazon-ebs: Adding tag: \"OS_Version\": \"CentOS\"",
                            "    amazon-ebs: Adding tag: \"Release\": \"packer 2018-01-23-01-05\"",
                            "    amazon-ebs: Adding tag: \"Name\": \"GE-PCT-Golden-AMI-DRYRUN-2018-01-23-01-05\"",
                            "    amazon-ebs: Adding tag: \"env\": \"dev\"",
                            "    amazon-ebs: Adding tag: \"uai\": \"uai9999999\"",
                            "    amazon-ebs: Adding tag: \"preserve\": \"true\"",
                            "    amazon-ebs: Adding tag: \"AMI_Version\": \"1.2.2.14\"",
                            "==\u003e amazon-ebs: Creating snapshot tags",
                            "==\u003e amazon-ebs: Terminating the source AWS instance...",
                            "==\u003e amazon-ebs: Cleaning up any extra volumes...",
                            "==\u003e amazon-ebs: Destroying volume (vol-0452ede2330fff78e)...",
                            "==\u003e amazon-ebs: Deleting temporary keypair...",
                            "Build 'amazon-ebs' finished.",
                            "--\u003e amazon-ebs: AMIs were created:"
                        ],
                        "OutputAmis": [
                            {
                                "AmiID": "ami-de2d1ba4",
                                "AmiRegion": "us-east-1",
                                "AmiSharedTo": [
                                    "277688789493",
                                    "781536292953",
                                    "188894168332"
                                ],
                                "AmiTags": null
                            }
                        ],
                        "SourceAmi": "ami-d424b4c2"
                    },
                    "CreateDate": "2018-01-30 04:36:25"
                }
            ]
        };
        Card(exampleObj);
    } else {
            $.ajax({
        url: queryURL,
        method: "GET",
        crossDomain: true
    })
    // After data comes back from the request
    .then(function (response) {
        console.log(queryURL);
        Card(response);
    });
    }

}

$(document).ready(function () {
    $("#search").click(function (e) {
        e.preventDefault();
        // hide all submenus first
        console.log("Clicked search button");

        var searchinput = $("#search-input").val().trim();
        // Calling render detail which handles the processing
        console.log(searchinput);
        renderDetails(searchinput);
    });
});
