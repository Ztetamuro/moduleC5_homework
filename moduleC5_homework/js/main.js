const btn = document.querySelector('.j-btn');
const result = document.querySelector('.result')
// Массив для localStorage
arrayStorage = [];

const localPars = localStorage.getItem('localUrl');
const localStor = JSON.parse(localPars)

if (localStor != null){
    localStor.map(function(item){
    const images = document.createElement('img');
    images.src = item
    result.append(images)
    })
};


// Заполнил массив с необходимыми числами диапазона, кривовато
let arr = [];
for(let i = 1; i <= 10; i++){
    arr.push(i)
};
btn.addEventListener('click', () => {
    let heightInput = false;
    let weightInput = false;
    const weightValue = document.querySelector('.limit').value;
    const heightValue = document.querySelector('.pageNumber').value;
    const inner = document.querySelector('.inner-text');
    // Проверка на соблюдение дипазона чисел
    for(let i = 0; i<= arr.length; i++){
        if (heightValue == arr[i]){
            heightInput = true;
        }        
    };
    for(let i = 0; i<arr.length;i++){
        if(weightValue == arr[i]){
            weightInput = true;
        }
    };

    if(heightInput == false && weightInput == false){
        inner.innerHTML = "Номер страницы и лимит вне диапазона";
    }
    else if(heightInput == true && weightInput == false) {
        inner.innerHTML = 'Лимит вне диапазона';
    }
    else if(heightInput == false && weightInput == true){
        inner.innerHTML = 'Номер страницы вне диапазона';
    }
    else{ 
        inner.innerHTML = "";
        const options = {
            method: 'GET',
            mode: 'cors'
        };
        fetch(`https://picsum.photos/v2/list?page=${heightValue}&limit=${weightValue}`, options)
        .then((response) => {
        console.log('response', response);
        return response.json();
        })
        // Выводим изображения и сохраняем download_url в массив
        .then((data) => {
            console.log('data', data);  
            const fragment = new DocumentFragment();      
            data.map(function(item){
                const image = document.createElement('img');
                image.src = item.download_url;
                fragment.append(image);
                arrayStorage.push(item.download_url)
                localStorage.setItem('localUrl', JSON.stringify(arrayStorage));
            })
            result.append(fragment);        

        })
        .catch(() => { console.log('error') });
    
    }
    

});
