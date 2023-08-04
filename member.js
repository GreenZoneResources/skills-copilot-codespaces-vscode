function skillsMember() {
  const skills = document.getElementById('skills');
  if (skills) {
    skills.addEventListener('click', (event) => {
      if (event.target.classList.contains('btn-remove')) {
        const skillId = event.target.getAttribute('data-skill-id');
        const memberId = event.target.getAttribute('data-member-id');
        axios
          .post(`/members/${memberId}/skills/${skillId}/remove`)
          .then((response) => {
            event.target.parentElement.remove();
          });
      }
    });
  }
}