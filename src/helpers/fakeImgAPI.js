


const imageList = [
    "https://cdn-icons-png.flaticon.com/512/1998/1998592.png",
    "https://cdn-icons-png.flaticon.com/512/616/616438.png",
    "https://cdn-icons-png.flaticon.com/512/1623/1623681.png",
    "https://cdn-icons-png.flaticon.com/512/2977/2977285.png",
    "https://cdn-icons-png.flaticon.com/512/1998/1998749.png"
]

export const getRandomImg = () => {
   const image = imageList[Math.floor(Math.random()*imageList.length)]
   return image;
}

const getImgById = (id) => {
    const imagesStore = JSON.parse(localStorage.getItem('contacts-img')) ?? [];
    const imageFromStore = imagesStore.find((item) => item[id]);
    const result = imageFromStore ? imageFromStore[id] : imageList[0];
    return result;
}

const setRandomImg = (id) => {
    const prevArr = JSON.parse(localStorage.getItem('contacts-img')) ?? [];
    const newArr = [...prevArr, {[id] : getRandomImg()}];
    localStorage.setItem('contacts-img', JSON.stringify(newArr));
}


export const fakeImgAPI = {
    images: imageList,
    getRandomImg,
    getImgById,
    setRandomImg,

}