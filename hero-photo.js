(() => {
  const image = document.getElementById('homeHeroImage');
  if (!image) return;

  Promise.all([
    fetch('assets/hero-surveyor-oman.part1.txt').then(response => {
      if (!response.ok) throw new Error('Unable to load hero image data part 1');
      return response.text();
    }),
    fetch('assets/hero-surveyor-oman.part2.txt').then(response => {
      if (!response.ok) throw new Error('Unable to load hero image data part 2');
      return response.text();
    })
  ])
    .then(parts => {
      image.src = `data:image/jpeg;base64,${parts.join('').replace(/\s+/g, '')}`;
    })
    .catch(error => {
      console.error('Khaleej Vision hero image failed to load:', error);
    });
})();
