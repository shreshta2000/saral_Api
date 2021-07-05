const axios = require('axios');
const fs = require("fs");
const user_input = require('readline-sync');
axios.get("http://api.navgurukul.org/courses").then(resp => {
    const courseName = resp.data;
    var Jsondata = JSON.stringify(courseName,null,4);
    fs.writeFile("course.json",Jsondata,(err) => {
        });
    var serialNumber = 0;
    while ( serialNumber < courseName.length){
        console.log(serialNumber+1,courseName[serialNumber]["name"],courseName[serialNumber]["id"])
    serialNumber = serialNumber + 1
    };

const course = user_input.question("Entre the course number : ");
const selectedCourse = courseName[course - 1]["name"];
const selectedCourseId = courseName[course - 1]["id"];
console.log(selectedCourse);
axios.get(`http://saral.navgurukul.org/api/courses/ ${selectedCourseId} /exercises`).then(resp => {
    const parentExecrise = resp.data;
    var Jsondata = JSON.stringify(parentExecrise,null,4);
    fs.writeFile("parent_execrise.json",Jsondata,(err) => {
        });
    var serialNumber = 1;
    while (serialNumber < parentExecrise["data"].length){
        console.log(serialNumber,parentExecrise["data"][serialNumber]["name"]);
        if(parentExecrise["data"][serialNumber]["childExercises"].length == 0){
            console.log("   1",parentExecrise["data"][serialNumber]["slug"]);
        }else {
            var i = 0;
            while (i < parentExecrise["data"][serialNumber]["childExercises"].length){
                console.log("      ",i+1,parentExecrise["data"][serialNumber]["childExercises"][i]["name"]);
            i = i + 1
            };
        };
        serialNumber = serialNumber + 1
    };
    const parent_execrise = user_input.question("Enter the parent execrise : ");
    const selectedparentexecrise = parentExecrise["data"][parent_execrise - 1]["name"];
    console.log("  ",selectedparentexecrise);
    if(parentExecrise["data"][parent_execrise]["childExercises"].length == 0){
        console.log("   1",parentExecrise["data"][parent_execrise]["slug"]);
    }else {
        var i = 0;
        while (i < parentExecrise["data"][parent_execrise]["childExercises"].length){
            console.log("    ",i+1,parentExecrise["data"][parent_execrise]["childExercises"][i]["name"]);
        i = i + 1
        };
        var child_exercise = user_input.question("Enter the question number : ");
        var slug = parentExecrise["data"][parent_execrise]["childExercises"][child_exercise]["slug"];
        axios.get(" http://saral.navgurukul.org/api/courses/" + selectedCourseId + "/exercise/getBySlug?slug=" + slug).then(resp => {
            Question_content = resp.data;
            var Jsondata = JSON.stringify(Question_content,null,4);
            fs.writeFile("child.json",Jsondata,(err) => {
        });
        console.log(Question_content["content"]);
            })
        };
    });
});