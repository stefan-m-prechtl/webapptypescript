import { v4 as uuidV4 } from "uuid"

document.addEventListener("DOMContentLoaded", main)

type Task = {
    id: string
    title: string
}


function main() {
    let inputElem = document.querySelector<HTMLInputElement>("#inputTask");

    inputElem?.addEventListener("keyup", (event) => {
        event.preventDefault()
        if (event.key === 'Enter') {
            let content = inputElem.value as string;
            if (content !== "") {
                addTask(content)
                inputElem.value = ""
            }
        }
    });

    function addTask(content: string) {
        const createdTask: Task = {
            id: uuidV4(),
            title: content
        }
        console.log(createdTask)

    }
}