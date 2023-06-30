export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    
    this.load()
  }

  load(){
    this.entries =[
      {
        login: 'LucasFCdev',
        name: 'Lucas Ferraz',
        public_repos: '15',
        follower: '182'
      },

       {
        login: 'LucasFCdev',
        name: 'Lucas Ferraz',
        public_repos: '18',
        follower: '86'
      }
    ]
  }
}

export class FavoritesView extends Favorites {
  constructor(root){
    super(root)    
 
    this.tbody = this.root.querySelector('table tbody') 
    
    this.update()

    //this.removeAllTr()
    //this.update()
  }

    update(){

      this.removeAllTr()

      this.entries.forEach( user => {
        const row = this.createRow()
        console.log(row)

        console.log(row)
        row.querySelector('.user img').src = `https://github.com/${user.login}.png`
        row.querySelector('.user span').textContent = user.name
        row.querySelector('.user p').textContent =  user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.follower

        this.tbody.append(row)
      })
      //this.tbody.append(row)
      //}  
    }

    createRow() {
      const tr = document.createElement('tr')

      tr.innerHTML = `
        <td class="user">
          <img src="https://github.com/LucasFCdev.png" alt="">
          <a href="https://github.com/LucasFCdev" target="_blank">
            <span>Lucas Ferraz</span>
            <p>lucasFCdev</p>
          </a>
        </td>
        <td class="repositories">
          <p></p>
        </td>
        <td class="followers"></td>
        <td class="remove">&times;</td>
      `
      return tr
    } 

    removeAllTr(){
      
      this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
          tr.remove()
        })
     
    }

}