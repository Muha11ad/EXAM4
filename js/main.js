//Selectors && Render
const template = document.querySelector(".template")
const renderParrot = (parrot) =>{
    const {
        id,
        title,
        img,
        price,
        birthDate,
        sizes,
        features
    } = parrot
    const templateContent = template.content.cloneNode(true)
    const titleDom = templateContent.querySelector(".parrots__title")  
    titleDom.textContent = title;
    const imgDom = templateContent.querySelector(".parrots__img")  
    imgDom.src = img;
    const priceDom =  templateContent.querySelector(".parrots__mark")  
    priceDom.textContent = `$${price}`;
    const birthDateDom = templateContent.querySelector(".parrots__date")  
    birthDateDom.textContent = birthDate;
    const ability = templateContent.querySelector(".parrots__list-item")
    const subtitle = templateContent.querySelector(".parrots__subtitle")
    subtitle.textContent = `${sizes.width}x${sizes.height}`
    ability.textContent = features
    const editBtn = templateContent.querySelector(".parrots__edit-btn")
    editBtn.setAttribute("data-id", id)
    const delBtn = templateContent.querySelector(".parrots__del-btn")
    delBtn.setAttribute("data-id", id)
    return templateContent
};  
    let showingParrots = Parrots.slice();
    const wrapList = document.querySelector(".parrots-wrapper")
    const count = document.querySelector(".count")
    const renderParrots = () =>{
        count.textContent = `Count:${showingParrots.length}`
        wrapList.innerHTML= '';
        const fragment = document.createDocumentFragment();
        showingParrots.forEach((parrot) =>{
            const Parrotcard = renderParrot(parrot);
            fragment.appendChild(Parrotcard);
        })
        wrapList.appendChild(fragment);
    }
    renderParrots()
//Add
const modal = document.querySelector("#add-parrot-modal")
const Modal = new bootstrap.Modal(modal)
const addForm = document.querySelector("#add-form")
addForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const elements = evt.target.elements;
    const titleAdd = elements.title.value;
    const imgAdd = elements.img.value;
    const priceAdd = +elements.price.value;
    const dateAdd = elements.date.value;
    const widthAdd = +elements.width.value;
    const heightAdd = +elements.height.value;
    const featuresAdd = elements.features.value;

    if (titleAdd.trim()) {
        const newParrot ={
            id: Math.floor(Math.random() * 1000),
            title: titleAdd,
            img: String(imgAdd),
            price:priceAdd,
            birthDate: dateAdd,
             sizes:{
                width: widthAdd,
                height: heightAdd
             },
             features:featuresAdd
        } 
        Parrots.push(newParrot)
        showingParrots.push(newParrot)
        localStorage.setItem("parrot", JSON.stringify(Parrots))
    }
    renderParrots();
    addForm.reset();
    Modal.hide();
})
//Edit;
const titleEdit  = document.querySelector("#edit-parrot-title")
const imgEdit  = document.querySelector("#edit-parrot-img")
const priceEdit  = document.querySelector("#edit-price")
const dateEdit  = document.querySelector("#edit-parrot-date")
const widthEdit = document.querySelector("#edit-parrot_width");
const heightEdit = document.querySelector("#edit-parrot_height")
const featuresEdit = document.querySelector("#edit-features")
const editForm = document.querySelector("#edit-parrot-modal")
const editFormModul = new bootstrap.Modal(editForm)

wrapList.addEventListener("click", (e)=>{
    e.preventDefault();
    if(e.target.matches(".parrots__del-btn")){
        const clickedDel = +e.target.dataset.id
        const ClickParrot = showingParrots.findIndex((parrot)=>{
           return parrot.id == clickedDel;
        })
        Parrots.splice(ClickParrot, 1) 
        showingParrots.splice(ClickParrot, 1)         
        localStorage.setItem("parrot", JSON.stringify(Parrots))
        renderParrots()  
    }
    else if (e.target.matches(".parrots__edit-btn")){
        const clickedEdit = +e.target.dataset.id
        const ClickParrot = Parrots.find((parrot)=>{
           return parrot.id === clickedEdit;
        })
        titleEdit.value = ClickParrot.title
        imgEdit.value = ClickParrot.img
        priceEdit.value = ClickParrot.price
        dateEdit.value = ClickParrot.birthDate
        widthEdit.value = ClickParrot.sizes.width
        heightEdit.value = ClickParrot.sizes.height
        featuresEdit.value = ClickParrot.features
        editForm.setAttribute("data-editing-id", ClickParrot.id)

        
    }
})
renderParrots();

    editForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const editClicked = +e.target.dataset.editingId; 

        if(titleEdit.value.trim()){
            let parrot ={
                id: editClicked,
                title: titleEdit.value,
                img: String(imgEdit.value),
                price:priceEdit.value,
                birthDate: dateEdit.value,
                 sizes:{
                    width: widthEdit.value,
                    height: heightEdit.value
                 },
                 features:featuresEdit.value
            }
            const editedParrot =Parrots.findIndex((parrot)=>{
                return parrot.id === editClicked
            }) 
            const editParrot =showingParrots.findIndex((parrot)=>{
                return parrot.id === editClicked
            }) 
            Parrots.splice(editedParrot,1,parrot)
            Parrots.splice(editParrot,1,parrot)
            JSON.parse(localStorage.getItem("parrot")).find((editedParrot) => {
                return parrot = editedParrot
            })
            localStorage.setItem("parrot" , JSON.stringify(Parrots))
            editFormModul.hide()
        }   
renderParrots()
})

const filterForm = document.querySelector(".filter")
filterForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const elements = e.target.elements;

    const from = elements.from.value;
    const to = elements.to.value;
    const search = elements.search.value;
    const fromW = elements.from_width.value;
    const toW = elements.to_width.value;
    const fromH = elements.from_height.value;
    const toH= elements.to_height.value;
    const sortValue = elements.sortby.value;

    showingParrots = Parrots.sort((a,b)=>{
        switch (sortValue) {
            case "1":
                if (a.name > b.name) {
                return -1
                } else if (a.name < b.name) {
                    return 1
                };
                case "2":
                    return b.price - a.price
                case "3":
                    return a.price - b.price
                case "4":
                    return toString(Math.floor(a.birthDate) - Math.floor(b.birthDate))
                
                case "5": 
                    return toString(Math.floor(b.birthDate) - Math.floor(a.birthDate))
                break;
            default:
                break;
        }  
    }).filter((parrot)=>{
        return parrot.price >= from
    }).filter((parrot)=>{
        return !to ? true : parrot.price <= to;
    }).filter((parrot)=> {
        return parrot.sizes.width >= fromW;
    }).filter((parrot)=> {
        return !toW ? true : parrot.sizes.width <= toW;
    }).filter((parrot)=> {
        return parrot.sizes.height >= fromH;
    }).filter((parrot)=>{
        return !toH ? true : parrot.sizes.height <= toH;
    }).filter(function(parrot) {
        const regExp = new RegExp(search, 'gi')
        return parrot.title.match(regExp);
    });
renderParrots()
})