# Driven-Tweetero <img width="40" height="40" src="https://cdn.pixabay.com/photo/2013/06/07/09/53/twitter-117595_1280.png"/>
Construção de uma API simples utilizando Express e NodeJS.

## Requisitos Obrigatórios ⚠️

### Armazenamento dos Dados:
- Utilização de variáveis globais em memória.
- Formato geral dos dados:

``` javascript
userSchema = {
  username: 'usuário',
  avatar: 'link do avatar' 
}

tweetSchema = {
  username: 'usuário',
  tweet: 'mensagem'
}
```

## Rotas ⚙️

### /sign-up
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe o parâmetro **username, avatar** pelo _body_ e salva o usuário na variável global.
<br>
### /tweets
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16) Retorna a lista de tweets de acordo com o parâmetro **page** via _query string_, retorna últimos 10 tweets caso esse parâmetro não seja fornecido.<br>
<br>
![](https://place-hold.it/80x20/26ec48/ffffff?text=POST&fontsize=16) Recebe o parâmetro **tweet** pelo _body_ e o parâmetro **username** pelo _header_ e salva o tweet na variável global.
<br>
### /tweets/username
![](https://place-hold.it/80x20/26baec/ffffff?text=GET&fontsize=16)  Retorna todos os tweets publicados de um usuário dado o parâmetro **username** via _path params_.
