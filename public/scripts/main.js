showCreateModal();
let selectedRequest = {};

function showCreateModal() {
  $("#createModal").modal({
    backdrop: false,
    focus: true
  });
}
         
function viewRequestDetails(index) {
  console.log(requests, index);
  selectedRequest = requests[index];
  console.log(selectedRequest);
  $("#detailsFirstName").html(selectedRequest.FIRST_NAME);
  $("#detailsLastName").html(selectedRequest.LAST_NAME);
  $("#detailsSummary").html(selectedRequest.CSR_SUMMARY);
  $("#detailsBusinessValue").html(selectedRequest.CSR_BUSINESS_VALUE);
  $("#detailsPayForward").html(selectedRequest.CSR_PAY_FORWARD_DESC);
  $("#detailsFundingAmtReq").html(selectedRequest.CSR_FUNDING_AMT_REQ);
  $("#detailsFundingDeadline").html(selectedRequest.CSR_FUNDING_DEADLINE);
  $("#contributions").html(selectedRequest.CONTRIBUTIONS);
  console.log("lookhere::",selectedRequest.CONTRIBUTIONS)
  // $("#contributions").html(selectedRequest.CONTRIBUTIONS[0].FUNDER_FIRST_NAME);
  
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
