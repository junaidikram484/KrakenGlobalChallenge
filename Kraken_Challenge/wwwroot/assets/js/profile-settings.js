/*
Author       : Dreamguys
Template Name: Doccure - Bootstrap Template
Version      : 1.0
*/

(function ($) {
    "use strict";

    //clinic Images handling
    $('body').on('click', '.btn-clinic-image-del', function () {
        var result = confirm('Do you want to delete?');
        if (result) {
            var deletebtn = $(this);
            //post data to update
            $.ajax({
                type: "POST",
                url: "/Account/DeleteClinicImage",
                data: { clinicID: deletebtn.data('clinic-id'), imagePath: deletebtn.siblings().eq(0).attr('src') },
                success: function (data) {
                    if (data == true) {
                        deletebtn.parent().remove();
                    }
                }
            });
        }
        return false;
    })

    // Pricing Options Show

    $('#pricing_select input[name="Pricing"]').on('click', function () {
        console.log('pricing changed ' + $(this).val());
        if ($(this).val() == 'False') {
            $('#custom_price_cont').hide();
        }
        if ($(this).val() == 'True') {
            $('#custom_price_cont').show();
        }
        else {
        }
    });

    var radioValue = $('#pricing_select input[name="Pricing"]:checked').val();
    console.log(radioValue + ' radio value');
    if (radioValue == 'False') {
        $('#custom_price_cont').hide();
    }
    if (radioValue == 'True') {
        $('#custom_price_cont').show();
    }
    else {
    }

  //  // Education Add More

  //  var beforeEditEducationValues = [];

  //  $(".education-info").on('click', '.trash', function () {
  //      var length = $(".education-cont").length - 1;
  //      var className = 'l-' + length;
  //      if ($(this).parent().parent().hasClass(className)) {
  //          $(this).parent().parent().remove();
  //      }
  //      else {
  //          $(this).parent().parent().siblings('.' + className).remove();
  //      }
  //      //$(this).parent().parent(className).remove()
  //      //$(this).closest('.l-'+length).remove();
  //      return false;
  //  });

  //  $("body").on('click', '.add-education', function () {
  //      var length = $(".education-cont").length;
  //      var educationcontent = '<div class="row form-row education-cont l-' + length + '">' +
		//	'<div class="col-12 col-md-10 col-lg-11">' +
		//		'<div class="row form-row">' +
		//			'<div class="col-12 col-md-6 col-lg-4">' +
		//				'<div class="form-group">' +
		//					'<label class="focus-label" for="Degree">Degree</label>' +
		//					'<input class="form-control floating text-box single-line" id="Degree" name="[' + length + '].Degree" type="text" value="">' +
  //                          '<span class="field-validation-valid text-danger" data-valmsg-for="Degree" data-valmsg-replace="true"></span>' +
		//				'</div>' +
		//			'</div>' +
		//			'<div class="col-12 col-md-6 col-lg-4">' +
		//				'<div class="form-group">' +
		//					'<label class="focus-label" for="Institute">College/Institute</label>' +
		//					'<input class="form-control floating text-box single-line" id="Institute" name="[' + length + '].Institute" type="text" value="">' +
  //                          '<span class="field-validation-valid text-danger" data-valmsg-for="Institute" data-valmsg-replace="true"></span>' +
		//				'</div>' +
		//			'</div>' +
		//			'<div class="col-12 col-md-6 col-lg-4">' +
		//				'<div class="form-group">' +
		//					'<label class="focus-label" for="YearOfCompletion">Completion Year</label>' +
		//					'<input type="text" name="[' + length + '].YearOfCompletion" class="form-control datepicker-custom">' +
  //                          '<span class="field-validation-valid text-danger" data-valmsg-for="YearOfCompletion" data-valmsg-replace="true"></span>' +
		//				'</div>' +
		//			'</div>' +
		//		'</div>' +
		//	'</div>' +
		//	'<div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
		//'</div>';

  //      $(".education-info").append(educationcontent);
  //      //$(".datepicker-custom").datetimepicker({
  //      //    format: "YYYY",
  //      //    viewMode: "years"
  //      //});
  //      return false;
  //  });

  //  $('body').on('click', '.delete-education', function () {
  //      var result = confirm("Want to delete?");
  //      if (result) {
  //          var currentObj = $(this);
  //          $.ajax({
  //              type: "POST",
  //              url: "/Account/DeleteEducation",
  //              data: { educationID: currentObj.data('id') },
  //              success: function (data) {
  //                  console.log(data)
  //                  if (data == true) {
  //                      currentObj.closest('tr').remove();
  //                  }
  //              }
  //          });
  //      }
  //      return false;
  //  })

  //  $('body').on('click', '.save-edit-education', function () {
  //      var result = confirm("Want to Update?");
  //      if (result) {
  //          var editID = $(this).data('id'); //id of education record
  //          var currentObj = $(this); //edit button selection
  //          var degreeTD = $(this).parent().siblings('td').eq(0);
  //          var instituteTD = $(this).parent().siblings('td').eq(1);
  //          var yearTD = $(this).parent().siblings('td').eq(2);
  //          var actionTD = $(this).parent();
  //          var degreeText = degreeTD.children().val();
  //          var instituteText = instituteTD.children().val();
  //          var yearText = yearTD.children().val();

  //          //post data to update
  //          $.ajax({
  //              type: "POST",
  //              url: "/Account/UpdateEducation",
  //              data: { EducationID: editID, Institute: instituteText, Degree: degreeText, YearOfCompletion: yearText },
  //              success: function (data) {
  //                  console.log(data)
  //                  if (data == true) {
  //                      console.log(currentObj.parent().parent())
  //                      currentObj.parent().parent().removeClass('.isEdit');
  //                      var degreeEditBox = currentObj.parent().parent().children('td').eq(0);
  //                      var instituteEditBox = currentObj.parent().parent().children('td').eq(1);
  //                      var yearEditBox = currentObj.parent().parent().children('td').eq(2);
  //                      var actionsEditBox = currentObj.parent().parent().children('td').eq(3);
  //                      degreeEditBox.html(degreeEditBox.children().val());
  //                      instituteEditBox.html(instituteEditBox.children().val());
  //                      yearEditBox.html(yearEditBox.children().val());
  //                      actionsEditBox.html('<a href="#" class="delete-education" data-id="' + editID + '">Delete</a> | <a href="#" class="edit-education" data-id="' + editID + '">Edit</a>');
  //                  }
  //              }
  //          });
  //      }
  //      return false;
  //  })

  //  $('body').on('click', '.edit-education', function () {
  //      var editID = $(this).data('id'); //id of education record
  //      var currentObj = $(this); //edit button selection
  //      currentObj.parent().parent().addClass('.isEdit');
  //      var degreeTD = $(this).parent().siblings('td').eq(0);
  //      var instituteTD = $(this).parent().siblings('td').eq(1);
  //      var yearTD = $(this).parent().siblings('td').eq(2);
  //      var actionTD = $(this).parent();
  //      var degreeText = degreeTD.text();
  //      var instituteText = instituteTD.text();
  //      var yearText = yearTD.text();
  //      beforeEditEducationValues.push({ 'editID': editID, 'degreeText': degreeText, 'instituteText': instituteText, 'yearText': yearText });

  //      degreeTD.html('<input type="text" name="Degree" class="form-control" maxlength="20" value="' + degreeText + '">');
  //      instituteTD.html('<input type="text" name="Institute" class="form-control" value="' + instituteText + '">');
  //      yearTD.html('<input type="text" name="YearOfCompletion" class="form-control datepicker-custom" value="' + yearText + '">');
  //      actionTD.html('<a href="#" class="save-edit-education" data-id="' + editID + '">Save</a> | <a href="#" class="cancel-edit-education" data-id="' + editID + '">Cancel</a>')
  //      return false;

  //  })

  //  $('body').on('click', '.cancel-edit-education', function () {
  //      var editID = $(this).data('id'); // id of education record

  //      var currentObj = $(this); //cancel button selection
  //      currentObj.parent().parent().removeClass('.isEdit');
  //      var degreeEditBox = currentObj.parent().parent().children('td').eq(0);
  //      var instituteEditBox = currentObj.parent().parent().children('td').eq(1);
  //      var yearEditBox = currentObj.parent().parent().children('td').eq(2);
  //      var actionsEditBox = currentObj.parent().parent().children('td').eq(3);
  //      var findObject = beforeEditEducationValues.find(x => x.editID == editID)
  //      degreeEditBox.html(findObject.degreeText);
  //      instituteEditBox.html(findObject.instituteText);
  //      yearEditBox.html(findObject.yearText);
  //      actionsEditBox.html('<a href="#" class="delete-education" data-id="' + editID + '">Delete</a> | <a href="#" class="edit-education" data-id="' + editID + '">Edit</a>');

  //      return false;
  //  })

  //  // Experience Add More
    
  //  var beforeEditExperienceValues = [];

  //  $(".experience-info").on('click', '.trash', function () {
  //      var length = $(".experience-cont").length - 1;
  //      var className = 'l-' + length;
  //      if ($(this).parent().parent().hasClass(className)) {
  //          $(this).parent().parent().remove();
  //      }
  //      else {
  //          $(this).parent().parent().siblings('.' + className).remove();
  //      }
  //      return false;
  //  });

  //  $("body").on('click', '.add-experience', function () {
  //      var length = $(".experience-cont").length;
  //      var experiencecontent = '<div class="row form-row experience-cont l-' + length + '">' +
		//	'<div class="col-12 col-md-10 col-lg-11">' +
		//		'<div class="row form-row">' +
		//			'<div class="col-12 col-md-6 col-lg-4">' +
		//				'<div class="form-group">' +
		//					'<label class="focus-label" for="HospitalName">Hospital / Clinic Name</label>' +
		//					'<input type="text" name="['+length+'].HospitalName" class="form-control">' +
  //                          '<span class="field-validation-valid text-danger" data-valmsg-for="HospitalName" data-valmsg-replace="true"></span>' +
		//				'</div>' +
		//			'</div>' +
		//			'<div class="col-12 col-md-6 col-lg-4">' +
		//				'<div class="form-group">' +
		//					'<label class="focus-label" for="FromDate">From</label>' +
		//					'<input type="text" name="['+length+'].FromDate" class="form-control datepicker-from-experience">' +
  //                          '<span class="field-validation-valid text-danger" data-valmsg-for="FromDate" data-valmsg-replace="true"></span>' +
		//				'</div>' +
		//			'</div>' +
		//			'<div class="col-12 col-md-6 col-lg-4">' +
		//				'<div class="form-group">' +
		//					'<label class="focus-label" for="ToDate">To</label>' +
		//					'<input type="text" name="['+length+'].ToDate" class="form-control datepicker-to-experience">' +
  //                          '<span class="field-validation-valid text-danger" data-valmsg-for="ToDate" data-valmsg-replace="true"></span>' +
		//				'</div>' +
		//			'</div>' +
		//			'<div class="col-12 col-md-6 col-lg-4">' +
		//				'<div class="form-group">' +
		//					'<label class="focus-label" for="Designation">Designation</label>' +
		//					'<input type="text" name="['+length+'].Designation" class="form-control" maxlength="20">' +
  //                          '<span class="field-validation-valid text-danger" data-valmsg-for="Designation" data-valmsg-replace="true"></span>' +
		//				'</div>' +
		//			'</div>' +
		//		'</div>' +
		//	'</div>' +
		//	'<div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
		//'</div>';

  //      $(".experience-info").append(experiencecontent);

  //      return false;
  //  });

  //  $('body').on('click', '.delete-experience', function () {
  //      var result = confirm("Want to delete?");
  //      if (result) {
  //          var currentObj = $(this);
  //          $.ajax({
  //              type: "POST",
  //              url: "/Account/DeleteExperience",
  //              data: { experienceID: currentObj.data('id') },
  //              success: function (data) {
  //                  console.log(data)
  //                  if (data == true) {
  //                      currentObj.closest('tr').remove();
  //                  }
  //              }
  //          });
  //      }
  //      return false;
  //  })

  //  $('body').on('click', '.edit-experience', function () {
  //      var editID = $(this).data('id'); //id of education record
  //      var currentObj = $(this); //edit button selection
  //      currentObj.parent().parent().addClass('.isEdit');
  //      var HospTD = $(this).parent().siblings('td').eq(0);
  //      var FromTD = $(this).parent().siblings('td').eq(1);
  //      var ToTD = $(this).parent().siblings('td').eq(2);
  //      var DesgTD = $(this).parent().siblings('td').eq(3);
  //      var actionTD = $(this).parent();
  //      var HospText = HospTD.text();
  //      var FromText = FromTD.text();
  //      var ToText = ToTD.text();
  //      var DesgText = DesgTD.text();
  //      beforeEditExperienceValues.push({ 'editID': editID, 'Hospital': HospText, 'from': FromText, 'to': ToText, 'desg': DesgText });

  //      HospTD.html('<input type="text" name="HospitalName" class="form-control" value="' + HospText + '">');
  //      FromTD.html('<input type="text" name="FromDate" class="form-control datepicker-from-experience" value="' + FromText + '">');
  //      ToTD.html('<input type="text" name="ToDate" class="form-control datepicker-to-experience" value="' + ToText + '">');
  //      DesgTD.html('<input type="text" name="Designation" class="form-control" value="' + DesgText + '">');
  //      actionTD.html('<a href="#" class="save-edit-experience" data-id="' + editID + '">Save</a> | <a href="#" class="cancel-edit-experience" data-id="' + editID + '">Cancel</a>')
  //      return false;

  //  })

  //  $('body').on('click', '.cancel-edit-experience', function () {
  //      var editID = $(this).data('id'); // id of education record

  //      var currentObj = $(this); //cancel button selection
  //      currentObj.parent().parent().removeClass('.isEdit');
  //      var HospEditBox = currentObj.parent().parent().children('td').eq(0);
  //      var FromEditBox = currentObj.parent().parent().children('td').eq(1);
  //      var ToEditBox = currentObj.parent().parent().children('td').eq(2);
  //      var DesgEditBox = currentObj.parent().parent().children('td').eq(3);
  //      var actionsEditBox = currentObj.parent().parent().children('td').eq(4);
  //      var findObject = beforeEditExperienceValues.find(x => x.editID == editID)
  //      HospEditBox.html(findObject.Hospital);
  //      FromEditBox.html(findObject.from);
  //      ToEditBox.html(findObject.to);
  //      DesgEditBox.html(findObject.desg);
  //      actionsEditBox.html('<a href="#" class="delete-experience" data-id="' + editID + '">Delete</a> | <a href="#" class="edit-experience" data-id="' + editID + '">Edit</a>');

  //      return false;
  //  })

  //  $('body').on('click', '.save-edit-experience', function () {
  //      var result = confirm("Want to Update?");
  //      if (result) {
  //          var editID = $(this).data('id'); //id of education record
  //          var currentObj = $(this); //edit button selection
  //          var HospTD = $(this).parent().siblings('td').eq(0);
  //          var FromTD = $(this).parent().siblings('td').eq(1);
  //          var ToTD = $(this).parent().siblings('td').eq(2);
  //          var DesgTD = $(this).parent().siblings('td').eq(3);
  //          var actionTD = $(this).parent();
  //          var hospText = HospTD.children().val();
  //          var fromText = FromTD.children().val();
  //          var toText = ToTD.children().val();
  //          var desgText = DesgTD.children().val();

  //          //post data to update
  //          $.ajax({
  //              type: "POST",
  //              url: "/Account/UpdateExperience",
  //              data: { ExperienceID: editID, HospitalName: hospText, FromDate: fromText, ToDate: toText, Designation: desgText },
  //              success: function (data) {
  //                  if (data == true) {
  //                      currentObj.parent().parent().removeClass('.isEdit');
  //                      var HospEditBox = currentObj.parent().parent().children('td').eq(0);
  //                      var FromEditBox = currentObj.parent().parent().children('td').eq(1);
  //                      var ToEditBox = currentObj.parent().parent().children('td').eq(2);
  //                      var DesgEditBox = currentObj.parent().parent().children('td').eq(3);
  //                      var actionsEditBox = currentObj.parent().parent().children('td').eq(4);
  //                      HospEditBox.html(HospEditBox.children().val());
  //                      FromEditBox.html(FromEditBox.children().val());
  //                      ToEditBox.html(ToEditBox.children().val());
  //                      DesgEditBox.html(DesgEditBox.children().val());
  //                      actionsEditBox.html('<a href="#" class="delete-experience" data-id="' + editID + '">Delete</a> | <a href="#" class="edit-experience" data-id="' + editID + '">Edit</a>');
  //                  }
  //              }
  //          });
  //      }
  //      return false;
  //  })

    // Awards Add More
    var beforeEditAwardValues = [];
    $(".awards-info").on('click', '.trash', function () {
        var length = $(".awards-cont").length - 1;
        var className = 'l-' + length;
        if ($(this).parent().parent().hasClass(className)) {
            $(this).parent().parent().remove();
        }
        else {
            $(this).parent().parent().siblings('.' + className).remove();
        }
        return false;
    });

    $("body").on('click', '.add-award', function () {
        var length = $(".awards-cont").length;
        var regcontent = '<div class="row form-row awards-cont l-' + length + '">' +
			'<div class="col-12 col-md-10 col-lg-11">' +
				'<div class="row form-row">' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label class="focus-label" for="AwardTitle">Award</label>' +
							'<input type="text" name="['+length+'].AwardTitle" class="form-control">' +
                            '<span class="field-validation-valid text-danger" data-valmsg-for="AwardTitle" data-valmsg-replace="true"></span>' +
						'</div>' +
					'</div>' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label class="focus-label" for="AwardYear">Year</label>' +
							'<input type="text" name="['+length+'].AwardYear" class="form-control datepicker-award">' +
                            '<span class="field-validation-valid text-danger" data-valmsg-for="AwardYear" data-valmsg-replace="true"></span>' +
						'</div>' +
					'</div>' +
					'<div class="col-12 col-md-6 col-lg-4">' +
						'<div class="form-group">' +
							'<label class="focus-label" for="AwardGivenBy">Award Given By</label>' +
							'<input type="text" name="['+length+'].AwardGivenBy" class="form-control">' +
                            '<span class="field-validation-valid text-danger" data-valmsg-for="AwardGivenBy" data-valmsg-replace="true"></span>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="col-12 col-md-2 col-lg-1"><label class="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>' +
		'</div>';

        $(".awards-info").append(regcontent);
        return false;
    });

    $('body').on('click', '.delete-award', function () {
        var result = confirm("Want to delete?");
        if (result) {
            var currentObj = $(this);
            $.ajax({
                type: "POST",
                url: "/Account/DeleteAward",
                data: { awardID: currentObj.data('id') },
                success: function (data) {
                    console.log(data)
                    if (data == true) {
                        currentObj.closest('tr').remove();
                    }
                }
            });
        }
        return false;
    })

    $('body').on('click', '.edit-award', function () {
        var editID = $(this).data('id'); //id of education record
        var currentObj = $(this); //edit button selection
        currentObj.parent().parent().addClass('.isEdit');
        var titleTD = $(this).parent().siblings('td').eq(0);
        var yearTD = $(this).parent().siblings('td').eq(1);
        var givenByTD = $(this).parent().siblings('td').eq(2);
        var actionTD = $(this).parent();
        var titleText = titleTD.text();
        var yearText = yearTD.text();
        var givenByText = givenByTD.text();
        beforeEditAwardValues.push({ 'editID': editID, 'title': titleText, 'year': yearText, 'givenBy': givenByText,});

        titleTD.html('<input type="text" name="AwardTitle" class="form-control" value="' + titleText + '">');
        yearTD.html('<input type="text" name="AwardYear" class="form-control datepicker-award" value="' + yearText + '">');
        givenByTD.html('<input type="text" name="AwardGivenBy" class="form-control" value="' + givenByText + '">');
        actionTD.html('<a href="#" class="save-edit-award" data-id="' + editID + '">Save</a> | <a href="#" class="cancel-edit-award" data-id="' + editID + '">Cancel</a>')
        return false;

    })

    $('body').on('click', '.cancel-edit-award', function () {
        debugger
        var editID = $(this).data('id'); // id of education record

        var currentObj = $(this); //cancel button selection
        currentObj.parent().parent().removeClass('.isEdit');
        var titleEditBox = currentObj.parent().parent().children('td').eq(0);
        var yearEditBox = currentObj.parent().parent().children('td').eq(1);
        var givenByEditBox = currentObj.parent().parent().children('td').eq(2);
        var actionsEditBox = currentObj.parent().parent().children('td').eq(3);
        var findObject = beforeEditAwardValues.find(x => x.editID == editID)
        titleEditBox.html(findObject.title);
        yearEditBox.html(findObject.year);
        givenByEditBox.html(findObject.givenBy);
        actionsEditBox.html('<a href="#" class="delete-award" data-id="' + editID + '">Delete</a> | <a href="#" class="edit-award" data-id="' + editID + '">Edit</a>');

        return false;
    })

    $('body').on('click', '.save-edit-award', function () {
        var result = confirm("Want to Update?");
        if (result) {
            var editID = $(this).data('id'); //id of education record
            var currentObj = $(this); //edit button selection
            var titleTD = $(this).parent().siblings('td').eq(0);
            var yearTD = $(this).parent().siblings('td').eq(1);
            var givenByTD = $(this).parent().siblings('td').eq(2);
            
            var actionTD = $(this).parent();
            var titleText = titleTD.children().val();
            var yearText = yearTD.children().val();
            var givenByText = givenByTD.children().val();

            //post data to update
            $.ajax({
                type: "POST",
                url: "/Account/UpdateAward",
                data: { AwardID: editID, AwardTitle: titleText, AwardYear: yearText, AwardGivenBy: givenByText},
                success: function (data) {
                    if (data == true) {
                        currentObj.parent().parent().removeClass('.isEdit');
                        var titleEditBox = currentObj.parent().parent().children('td').eq(0);
                        var yearEditBox = currentObj.parent().parent().children('td').eq(1);
                        var givenByEditBox = currentObj.parent().parent().children('td').eq(2);
                        var actionsEditBox = currentObj.parent().parent().children('td').eq(3);
                        titleEditBox.html(titleEditBox.children().val());
                        yearEditBox.html(yearEditBox.children().val());
                        givenByEditBox.html(givenByEditBox.children().val());
                        actionsEditBox.html('<a href="#" class="delete-award" data-id="' + editID + '">Delete</a> | <a href="#" class="edit-award" data-id="' + editID + '">Edit</a>');
                    }
                }
            });
        }
        return false;
    })

    // Membership Add More
    var beforeEditMembershipValues = [];
    $(".membership-info").on('click', '.trash', function () {
        var length = $(".membership-cont").length - 1;
        var className = 'l-' + length;
        if ($(this).parent().parent().hasClass(className)) {
            $(this).parent().parent().remove();
        }
        else {
            $(this).parent().parent().siblings('.' + className).remove();
        }
        return false;
    });

    $("body").on('click', '.add-membership', function () {
        var length = $(".membership-cont").length;
        var membershipcontent = '<div class="row form-row membership-cont l-' + length + '">' +
			'<div class="col-12 col-md-10 col-lg-5">' +
				'<div class="form-group">' +
					'<label class="focus-label" for="Membership">Membership</label>' +
					'<input type="text" name="['+length+'].Membership" class="form-control">' +
                    '<span class="field-validation-valid text-danger" data-valmsg-for="Membership" data-valmsg-replace="true"></span>' +
				'</div>' +
			'</div>' +
			'<div class="col-12 col-md-2 col-lg-2">' +
				'<label class="d-md-block d-sm-none d-none">&nbsp;</label>' +
				'<a href="#" class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a>' +
			'</div>' +
		'</div>';

        $(".membership-info").append(membershipcontent);
        return false;
    });

    $('body').on('click', '.delete-membership', function () {
        var result = confirm("Want to delete?");
        if (result) {
            var currentObj = $(this);
            $.ajax({
                type: "POST",
                url: "/Account/DeleteMembership",
                data: { membershipID: currentObj.data('id') },
                success: function (data) {
                    console.log(data)
                    if (data == true) {
                        currentObj.closest('tr').remove();
                    }
                }
            });
        }
        return false;
    })

    $('body').on('click', '.edit-membership', function () {
        var editID = $(this).data('id'); //id of education record
        var currentObj = $(this); //edit button selection
        currentObj.parent().parent().addClass('.isEdit');
        var membershipTD = $(this).parent().siblings('td').eq(0);
        var actionTD = $(this).parent();
        var membershipText = membershipTD.text();
        beforeEditMembershipValues.push({ 'editID': editID, 'title': membershipText});

        membershipTD.html('<input type="text" name="MemberShipTitle" class="form-control" value="' + membershipText + '">');
        actionTD.html('<a href="#" class="save-edit-membership" data-id="' + editID + '">Save</a> | <a href="#" class="cancel-edit-membership" data-id="' + editID + '">Cancel</a>')
        return false;

    })

    $('body').on('click', '.cancel-edit-membership', function () {
        
        var editID = $(this).data('id'); // id of education record

        var currentObj = $(this); //cancel button selection
        currentObj.parent().parent().removeClass('.isEdit');
        var membershipEditBox = currentObj.parent().parent().children('td').eq(0);
        
        var actionsEditBox = currentObj.parent().parent().children('td').eq(1);
        var findObject = beforeEditMembershipValues.find(x => x.editID == editID)
        membershipEditBox.html(findObject.title);
        
        actionsEditBox.html('<a href="#" class="delete-membership" data-id="' + editID + '">Delete</a> | <a href="#" class="edit-membership" data-id="' + editID + '">Edit</a>');

        return false;
    })

    $('body').on('click', '.save-edit-membership', function () {
        var result = confirm("Want to Update?");
        if (result) {
            var editID = $(this).data('id'); //id of education record
            var currentObj = $(this); //edit button selection

            var titleTD = $(this).parent().siblings('td').eq(0);
            var actionTD = $(this).parent();

            var membershipText = titleTD.children().val();
            
            //post data to update
            $.ajax({
                type: "POST",
                url: "/Account/UpdateMembership",
                data: { 'MembershipID': editID, 'Membership': membershipText },
                success: function (data) {
                    console.log(data)
                    if (data == true) {
                        currentObj.parent().parent().removeClass('.isEdit');
                        var membershipEditBox = currentObj.parent().parent().children('td').eq(0);

                        var actionsEditBox = currentObj.parent().parent().children('td').eq(1);
                        membershipEditBox.html(membershipEditBox.children().val());

                        actionsEditBox.html('<a href="#" class="delete-membership" data-id="' + editID + '">Delete</a> | <a href="#" class="edit-membership" data-id="' + editID + '">Edit</a>');

                    }
                }
            });
        }
        return false;
    })

    //country ddl

    $('body').on('change', '#ddlCountry', function () {
        $("#ddlState").empty();
        $("#ddlCity").empty();
        console.log($(this).val())
        if ($(this).val() != "-1") {
            GetStates($(this).val());
        }
    })

    $('body').on('change', '#ddlState', function () {
        $("#ddlCity").empty();
        console.log($(this).val())
        if ($(this).val() != "-1") {
            GetCities($(this).val())
        }
    })

    var country = $('#ddlCountry').val();
    var state = $('#state-id-value').val();
    var city = $('#city-id-value').val();
    if (parseInt(country) > 0) {
        console.log('country has value ' + country)
        console.log('State has value ' + state)
        console.log('city has value ' + city)
        selectValueForState(country, state);
        selectValueForCity(state, city)
    }

})(jQuery);


function GetStates(countryID) {
    $.ajax({
        type: "POST",
        url: "/Account/GetStates",
        data: { countryID: countryID },
        success: function (data) {
            var o = new Option("--Please Select--", -1);
            $(o).html("--Please Select--");
            $("#ddlState").append(o);


            $.each(data, function (index, value) {
                var o = new Option(value.name, value.id);
                $(o).html(value.Name);
                $("#ddlState").append(o);
            })
        }
    });
}

function GetCities(stateID) {
    $.ajax({
        type: "POST",
        url: "/Account/GetCities",
        data: { stateID: stateID },
        success: function (data) {
            $("#ddlCity").empty();
            var o = new Option("--Please Select--", -1);
            $(o).html("--Please Select--");
            $("#ddlCity").append(o);


            $.each(data, function (index, value) {
                var o = new Option(value.name, value.id);
                $(o).html(value.Name);
                $("#ddlCity").append(o);
            })
        }
    });
}

function selectValueForState(countryID, stateValue) {
    $.ajax({
        type: "POST",
        url: "/Account/GetStates",
        data: { countryID: countryID },
        success: function (data) {
            var o = new Option("--Please Select--", -1);
            $(o).html("--Please Select--");
            $("#ddlState").append(o);
            $.when($.each(data, function (index, value) {
                var o = new Option(value.name, value.id);
                $(o).html(value.Name);
                $("#ddlState").append(o);
            })).then(function () {
                $("#ddlState").val(stateValue);
            }, function () {
                console.log('each failed');
            });
        }
    });

}

function selectValueForCity(stateID, cityValue) {
    $.ajax({
        type: "POST",
        url: "/Account/GetCities",
        data: { stateID: stateID },
        success: function (data) {
            $("#ddlCity").empty();
            var o = new Option("--Please Select--", -1);
            $(o).html("--Please Select--");
            $("#ddlCity").append(o);

            $.when($.each(data, function (index, value) {
                var o = new Option(value.name, value.id);
                $(o).html(value.Name);
                $("#ddlCity").append(o);
            })).then(function () {
                console.log(cityValue)
                $("#ddlCity").val(cityValue);
            }, function () {
                console.log('each failed');
            });

        }
    });
}