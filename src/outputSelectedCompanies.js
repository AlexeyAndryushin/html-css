const findButton = document.querySelector(
  '.findListButton'
);

export const outputSelectedCompanies = () => {
  function findList() {
    const selectedCards =
      document.querySelectorAll('.changedCard');
    if (selectedCards.length) {
      console.clear();
      selectedCards.forEach(function (child) {
        console.log(child.firstChild.textContent);
      });
    } else {
      console.log('тут пусто');
    }
  }
  findButton.addEventListener('click', findList);
};