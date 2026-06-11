(function () {
    "use strict";

    
    function CustomerForm(data) {
        data = data || {};
        this.customerId = data.customerId || 0;
        this.customerName = ko.observable(data.customerName || "");
        this.address = ko.observable(data.address || "");
        this.dateOfBirth = ko.observable((data.dateOfBirth || "").substring(0, 10));
        this.customerType = ko.observable(
            data.customerType || data.customerTypeName || "Personal"
        );
        this.email = ko.observable(data.email || "");
        this.phoneNumber = ko.observable(data.phoneNumber || "");
        this.isActive = ko.observable(data.isActive !== undefined ? data.isActive : true);
    }

    function CustomersViewModel() {
        var self = this;

        
        self.customers = ko.observableArray([]);
        self.editing = ko.observable(null);
        self.isEdit = ko.observable(false);
        self.isLoading = ko.observable(false);
        self.isSaving = ko.observable(false);
        self.errorMessage = ko.observable("");
        self.errors = ko.observable({});
        self.customerTypes = ["Personal", "Business"];
     

        var modal = new bootstrap.Modal(document.getElementById("customerModal"));

        
        self.formatDate = function (iso) {
            return iso ? new Date(iso).toLocaleDateString() : "";
        };

        
        self.loadCustomers = function () {
            self.isLoading(true);
            self.errorMessage("");
            $.ajax({ url: "/Customers/List", method: "GET", dataType: "json" })
                .done(function (data) { self.customers(data); })
                .fail(function () { self.errorMessage("Could not load customers. Is the API running?"); })
                .always(function () { self.isLoading(false); });
        };

        
        self.newCustomer = function () {
            self.isEdit(false); self.errors({});
            self.editing(new CustomerForm());
            modal.show();
        };
        self.editCustomer = function (customer) {
            self.isEdit(true); self.errors({});
            self.editing(new CustomerForm(customer));
            modal.show();
        };
        self.closeModal = function () { modal.hide(); };

        
        function validate(f) {
            var e = {};
            if (!f.customerName() || !f.customerName().trim()) {
                e.customerName = "Customer name is required.";
            } else if (f.customerName().length > 150) {
                e.customerName = "Maximum 150 characters.";
            }
            if (!f.dateOfBirth()) { e.dateOfBirth = "Date of birth is required."; }
            if (f.email() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email())) {
                e.email = "Enter a valid email address.";
            }
            self.errors(e);
            return Object.keys(e).length === 0;
        }

        self.searchTerm = ko.observable("");

        self.filteredCustomers = ko.computed(function () {

            var search = self.searchTerm().toLowerCase();

            if (!search) {
                return self.customers();
            }

            return ko.utils.arrayFilter(
                self.customers(),
                function (c) {
                    return (
                        (c.customerName || "").toLowerCase().includes(search) ||
                        (c.customerCode || "").toLowerCase().includes(search) ||
                        (c.customerType || "").toLowerCase().includes(search)
                    );
                }
            );
        });
        
        self.saveCustomer = function () {
            var f = self.editing();
            if (!validate(f)) return;

            var payload = {
                customerName: f.customerName(),
                address: f.address() || null,
                dateOfBirth: f.dateOfBirth(),
                customerType: f.customerType(),
                email: f.email() || null,
                phoneNumber: f.phoneNumber() || null,
                isActive: f.isActive()
            };

            self.isSaving(true); self.errorMessage("");

            var request = self.isEdit()
                ? $.ajax({
                    url: "/Customers/Update/" + f.customerId, method: "PUT",
                    contentType: "application/json", data: JSON.stringify(payload)
                })
                : $.ajax({
                    url: "/Customers/Create", method: "POST",
                    contentType: "application/json", data: JSON.stringify(payload)
                });

            request
                .done(function () { modal.hide(); self.loadCustomers(); })
                .fail(function () { self.errorMessage("Save failed. Check the API and try again."); })
                .always(function () { self.isSaving(false); });
        };

        
        self.deleteCustomer = function (customer) {
            if (!confirm("Delete " + customer.customerName + "?")) return;
            $.ajax({ url: "/Customers/Delete/" + customer.customerId, method: "DELETE" })
                .done(function () { self.customers.remove(customer); })
                .fail(function () { self.errorMessage("Delete failed."); });
        };

        
        self.loadCustomers();
    }

    ko.applyBindings(new CustomersViewModel());
})();