var inventory = {};


(function() {
	inventory = {
		collection: [],
		template: null,
		lastItemId: null,
		setDate: function() {
			var date = new Date();
			$('#order_date').text(date.toUTCString());
		},

		cacheTemplate: function() {
			var $i_template = $('#inventory_item').remove();
			this.template = $i_template.html();
		},

		createItem: (function() {
			var number = 0;

			return function() {
				number += 1;
				this.lastItemId = number;

				var item = {
					id: this.lastItemId,
					name: '',
					stockNumber: '',
					quantity: 1,
				}

				this.collection.push(item);
			}
		})(),

		createTemplate: function(id) {
			return this.template.replace(/ID/g, id);
		},

		deleteRow: function() {
			$(this).closest('tr').remove();
		},

		init: function() {
			this.setDate();
			this.cacheTemplate();
		}
	}
})();

$(function() {
		var $table = $('#inventory');

	inventory.init();

	$('#add_item').on('click', function(e) {
		e.preventDefault();

		var i = inventory;

		inventory.createItem();
		$table.append(i.createTemplate(i.lastItemId));
	})

	$table.on('blur', 'input', function(e) {
		var itemId = $(this).attr('name').match(/\d/)[0];
		var field = $(this).prev('label').attr('data-characteristic');


		var item = inventory.collection.filter(function(item) {
			return item.id === Number(itemId);
		})[0];

		item[field] = $(this).val();
	})

	$table.on('click', 'a', function(e) {
		e.preventDefault();

		var itemId = Number($(this).prev('input').attr('value') - 1); //collection is 0 index
		inventory.collection.splice(itemId, 1);
		inventory.deleteRow.call(this);
	})
});





