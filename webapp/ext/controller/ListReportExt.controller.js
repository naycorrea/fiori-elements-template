sap.ui.define([], function() {
  "use strict";

  return {
    async onInit() {
      return true;
    },

    _getSelectedItems(tableId) {
      const table = this.byId(tableId);
      const selectedItems = table.getTable().getSelectedItems();

      return selectedItems.map((item) => {
        item.getBindindContext().getObject();
      });
    },

    deleteLine(event) {
      const items = this._getSelectedItems(event.id);

      console.log(items);
    },
  };
});
