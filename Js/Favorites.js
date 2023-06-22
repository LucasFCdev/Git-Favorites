export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
  }
}

export class FavoritesView extends Favorites {
  constructor(root){
    super(root)

    this.update()
  }

  createRow() {
    const tr = document.createElement('tr')

    const content = `
      <td class="user">
        <img src="https://github.com/LucasFCdev.png" alt="">
        <a href="https://github.com/LucasFCdev" target="_blank">
          <span>Lucas Ferraz</span>
          <p>lucasFCdev</p>
        </a>
      </td>
      <td class="repositories">
        <p>76</p>
      </td>
      <td class="followers">8589</td>
      <td class="remove">&times;</td>
    `
    tr.innerHTML = content
  }

  update(){
   this.removeAllTr()
  }

  removeAllTr(){
    const tbody = document.querySelector('table tbody')

    tbody.querySelectorAll('tr')  
    .forEach((tr) =>{
      tr.remove()
    }     
    )
  }
}