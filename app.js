// function multiply(arr, n) {
//     let product = 1;
//     for (let i = 0; i < n; i++) {
//       product *= arr[i];
//     }
//     return product;
//   }
//   let arr = [4,5,6,4];
//  console.log(multiply([4,5,6,4], 2)); 
//  console.log("recur", multiply([4,5,6,4], 2-1) * arr[2 - 1]);


const themeMode = document.querySelector('.theme-mode');
const theme = document.querySelector('.light-theme');
const search = document.querySelector('.search--btn');
const userName = document.getElementById('username');

// interface binding
let devName = document.querySelector('.user--name');
let accName = document.querySelector('.account-name');
let userProfile = document.querySelector('.user-profile--img');
let userImg = userProfile.children;

let joinedDate = document.querySelector('.joined-date');
let userBio = document.querySelector('.user-bio');

let repoCount = document.querySelector('.repo-count');
let followerCount = document.querySelector('.follower-count');
let followingCount = document.querySelector('.following-count');

let userLocation = document.querySelector('.user-location');
let userBlog = document.querySelector('.user-blog');
let userTwitter = document.querySelector('.user-twitter');
let company = document.querySelector('.company');

themeMode.addEventListener('click', function(){
      theme.classList.toggle('dark-theme');
      
})
search.addEventListener('click', function(e){
    e.preventDefault();
    console.log(userName.value)
    let username = userName.value
    let url = `https://api.github.com/users/${username}`;
    console.log(url)
    console.log(fetch(`https://api.github.com/users/${username}`
    ).then(res => res.json()).then(data => {
      console.log(data)
      if(data.name != null) {
        devName.textContent = data.name;
      }else {
        devName.textContent = (data.login).toUpperCase();
      }
      accName.textContent = data.login;
      userProfile.src = data.avatar_url;
      joinedDate.textContent = dateConvert(data.created_at);
      if(data.bio != null) {
        userBio.textContent = data.bio;
      }
      repoCount.textContent = data.public_repos;
      followerCount.textContent = data.followers;
      followingCount.textContent = data.following;
      contactLink(data.location, userLocation);
      contactLink(data.blog, userBlog);
      contactLink(data.twitter_username, userTwitter);
      contactLink(data.company, company);

    }));
})

function dateConvert(date) {
  const createdDate = new Date(date);
  var options = {year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = createdDate.toLocaleDateString(undefined, options);
  return formattedDate.replace(",", " ");
}

function contactLink(link, linkElement) {
  console.log('work' + link);
  if(link != null && link != "") {
    linkElement.textContent = link;
  }else {  
    console.log(link , " is null");  
    linkElement.textContent = "Not Available";
    addContactStyle(linkElement);
  }
}

function addContactStyle(childName) {
  let contactInfo = childName.parentElement;
  contactInfo.classList.add('not-able');
}