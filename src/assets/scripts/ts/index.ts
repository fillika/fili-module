import './engine/Loader';

declare const GameEngine;

document.addEventListener('DOMContentLoaded', () => {
  const loader = new GameEngine.Loader();

  loader.addImage('First image', '/src/assets/media/img/jpeg.jpg');
  loader.addJson('persons', '/src/assets/files/json/persons.json');

  loader.load(() => {
    console.log('Images loaded');
  });

  console.log(loader);
});
