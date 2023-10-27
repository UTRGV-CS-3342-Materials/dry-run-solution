// your problem two code goes here
// remember that you can only use await in an async function

document.getElementById('trigger').addEventListener('click', async () => {
    const result = await fetch('/instructors');
    const data = await result.json();
    console.log(data)

    const list = document.getElementById('theList');
    for (let instructor of data) {
        const newItem = document.createElement('li');
        newItem.innerText = `${instructor.name}: ${instructor.awesomeness}`;

        list.append(newItem);
    }

});
