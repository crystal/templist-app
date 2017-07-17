function exportTemplate(template) {
  return (dispatch) => {
    dispatch({
      type: 'EXPORT_TEMPLATE_REQ'
    });
    const newBoard = {
      name: template.title
    };
    Trello.post('/boards/', newBoard, (board) => {
      Trello.get(`/boards/${board.id}/lists`, (lists) => {
        const myList = lists[0].id;

        let i = 0;
        function addItem() {
          const itemText = template.items[i];
          const newCard = {
            name: itemText,
            // Place this card at the bottom of my list
            idList: myList,
            pos: 'bottom'
          };
          Trello.post('/cards/', newCard, () => {
            if (i === template.items.length - 1) {
              dispatch({
                type: 'EXPORT_TEMPLATE_RES',
                title: newBoard.name,
                url: board.url
              });
            } else {
              i += 1;
              addItem();
            }
          });
        }
        addItem();
      });
    });
  };
}

export default exportTemplate;
