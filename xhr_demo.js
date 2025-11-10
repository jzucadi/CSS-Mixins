interface Movie {
  title: string;
  description: string;
  id: string;
  director: string;
  producer: string;
  release_date: string;
  rt_score: string;
}

const app = document.getElementById('root');

if (!app) {
  throw new Error('Root element not found');
}

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

const request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function(): void {
  // Begin accessing JSON data here
  const data: Movie[] = JSON.parse(this.response);
  
  if (request.status >= 200 && request.status < 400) {
    data.forEach((movie: Movie) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      const truncatedDescription = movie.description.substring(0, 300);
      p.textContent = `${truncatedDescription}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

request.send();
