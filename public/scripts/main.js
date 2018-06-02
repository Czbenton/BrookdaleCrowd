console.log("loaded!");
showCreateModal();
let selectedRequest = {};

function showCreateModal() {
  console.log("clicked");
  $("#createModal").modal({
    backdrop: false,
    focus: true
  });
}

function viewRequestDetails(index) {
  console.log(requests, index);
  selectedRequest = requests[index];
  console.log(selectedRequest);
  $("#username").html(selectedRequest.username);
  $("#summary").html(selectedRequest.summary);
  $("#detailsModal").modal({
    backdrop: false,
    focus: true
  });
}

function fundRequest(id) {
  const form = document.getElementById("fundForm");
  form.action = `/fund_request/${selectedRequest._id}`;
  //   action="/fund_request"
  //   form.value.append("requestId", selectedRequest._id);
  form.submit();
  $("#detailsModal").modal.hide();
}

function createNew() {
  const form = document.getElementById("createRequestForm");
  form.submit();
  $("#createModal").modal.hide();
}

function closeModal(id) {
  $(id).modal.hide();
}
