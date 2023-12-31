export class GithubUser{
  static search(username){
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
    .then(data => data.json())
    .then(({login, name, public_repos, followers}) => 
    (
      {
        login,
        name,
        public_repos,
        followers
      }
    ))
  }
}

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)   
    this.load()

    //GithubUser.search('LucasFCdev').then(user => console.log(user))
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites'))|| []
 
  }

  save(){
    localStorage.setItem('@github-favorites', JSON.stringify(this.entries))
  }

  async add(username){

    try{

     const userExists =this.entries.find(entry => entry.login === username)

     if(userExists){
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(username)

      if(user.login === undefined){
        throw new Error ('Usuário não encontrado!')
      }

      this.entries = [user,...this.entries]
      this.update()
      this.save()

    } catch(error){
      alert(error.message)
    }  
    
  }

  delete(user){
    const filteredUser = this.entries
    .filter(entry => entry.login != user.login)

    this.entries = filteredUser
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root){
    super(root)    
 
    this.tbody = this.root.querySelector('table tbody') 
    
    this.update()
    this.onadd()

    //this.removeAllTr()
    //this.update()
  }

  onadd(){
    const addButton = this.root.querySelector(".search button")
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

        this.add(value)
    }
  }


    update(){

      this.removeAllTr()

      this.entries.forEach( user => {
        const row = this.createRow()
        

        row.querySelector('.user img').src = `https://github.com/${user.login}.png`
        row.querySelector('.user span').textContent = user.name
        row.querySelector('.user p').textContent =  user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.followers

        row.querySelector('.remove').onclick = () => {
          const isOk = confirm("Tem certeza que deseja deletar esse usuário ?")

          console.log(user)
          if(isOk){
            this.delete(user)
          }
        }

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