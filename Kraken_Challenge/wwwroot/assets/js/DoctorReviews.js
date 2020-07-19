$('body').on('click', '.comment-btn', function () {
    console.log('reply button clicked');
    var p = $(this).parent().parent();
    var reviewID = $(this).parent().parent().find('input#ReviewID.review-id').val();
    
    var lengthCheckForOneReply = $(this).parent().siblings();
    console.log(lengthCheckForOneReply.length)
    if (lengthCheckForOneReply.length == 4) {
        p.append(`<Form id="reply-form" method="post" action="/Dashboard/SaveReply">
                    <div class="container">
                        <div class="row">
                            <div class ='col-md-12'>
                                    <input type='text' class ='form-control' name="ReplyText" placeholder='Reply here.'>
                                    <br/>
                                </div>
                            <input class="review-id" id="ReviewID" name="ReviewID" type="hidden" value="`+ reviewID + `">
                            <div class ='col-md-4'>
                                 <button type="Submit" class ='btn btn-primary btn-block btn-md'>Submit</button>
                            </div>
                        </div>
                     </div>
               </Form>
    `);
    }
    $('#reply-form').validate({ // initialize the plugin
        ignore: "",
        rules: {
            ReplyText: {
                required: true,
            },
            submitHandler: function (form) {
                form.submit();
            }
        }
    });
    return false;
})

$("body").on('click', '.trash', function () {
    var reviewReplyID = $(this).data('id');
    var div = $(this).parent().parent();
    
    Swal.fire({
        title: "Are you sure?",
        text: "This Reply will be deleted permanently!",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
    }).then(
        function (isConfirm) {
            if (isConfirm["isConfirmed"]) {
                DeleteAjax(reviewReplyID, div);      // submitting the form when user press yes
                AppendReplyButton(div.parent().parent().parent().siblings().eq(0).children())
            }
        }
);
    return false;
});

function DeleteAjax(reviewReplyID, div) {
    $.ajax({
        type: "POST",
        url: "/Dashboard/DeleteReply",
        data: { reviewReplyID: reviewReplyID },
        success: function (data) {
            console.log(data)
            if (data == true) {
                console.log($(this).parent())
                div.remove();

                alertDialogue('Reply Deleted', 'success');
            }
            else {
                alertDialogue('Something went wrong!', 'error');
            }
        }
    });
}

function alertDialogue(message, icon) {
    Swal.fire({
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 2500
    })
}

function AppendReplyButton(divToAppend) {
    console.log(divToAppend);
    var html = `<div class="comment-reply">
                                        <a class="comment-btn" href="#">
                                            <i class="fas fa-reply"></i> Reply
                                        </a>
                                    </div>`;
    divToAppend.append(html);
}