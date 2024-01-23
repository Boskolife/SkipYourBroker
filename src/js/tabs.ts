export function initTabs() {
  const faqTabs = document.querySelector<HTMLDivElement>('#faqTabs');
  if (!faqTabs) {
    return
  };

  const tabs = document.querySelectorAll<HTMLDivElement>('.click_element'),
    tabsContent = document.querySelectorAll<HTMLDivElement>('.tab_content'),
    tabsParent = document.querySelectorAll<HTMLDivElement>('.tabcontent'),
    closeItem = document.querySelectorAll<HTMLDivElement>('.open_status');

  function showTabContent(i: number = 0) {
    tabsContent[i].classList.toggle('show_content');
    tabs[i].classList.toggle('tab_active');
    closeItem[i].classList.toggle('open_active');
  }

  tabsParent.forEach((item) => {
    item.addEventListener('click', (event) => {
      const target = event.target as HTMLDivElement;
      if (target && target.classList?.contains('click_element')) {
        tabs.forEach((item, i) => {
          if (target == item) {
            showTabContent(i);
          }
        });
      }
    });
  });
}
