var formatDate = function (type, datetime) {
    if (datetime != undefined) {
        if (type = 'ddMMYYYY') {
            var arr = datetime.split(' ');
            var splitDate = arr[0].split('/');
            return (splitDate[1] + '/' + splitDate[0] + '/' + splitDate[2]);
        }
        else {
            var splitDate = datetime.split('/');
            return (splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0]);
        }
    }
};


var mainScript = {
    accordionHeader: {
        click: function (e) {
            $(e.currentTarget).find('a').click();
        }
    },
    close: {
        click: function (modalId) {
            var bodystyle = $('body').attr('style');
            bootbox.confirm("Are you sure, you want to close?", function (result) {
                if (!result) {
                    setTimeout(function () {
                        $('body').addClass('modal-open');
                    }, 500);

                    $('body').attr('style', bodystyle);
                    $('div.bootbox-confirm').modal('hide');
                    return false;
                }
                else {
                    setTimeout(function () {
                        $('body').removeAttr('style');
                    }, 500);
                    $('body').removeAttr('style');
                    $('#' + modalId).modal('hide');
                    return true;
                }
                return result;
            });
            //return confirm("Are you sure you want to leave this page as data you have entered may not be saved.");
        }
    },
    closeUnedited: {
        click: function (modalId) {
            var bodystyle = $('body').attr('style');
        //    bootbox.confirm("Are you sure you want to close?", function (result) {
                if (!result) {
                    setTimeout(function () {
                        $('body').addClass('modal-open');
                    }, 500);

                    $('body').attr('style', bodystyle);
                    $('div.bootbox-confirm').modal('hide');
                    return false;
                }
                else {
                    setTimeout(function () {
                        $('body').removeAttr('style');
                    }, 500);
                    $('body').removeAttr('style');
                    $('#' + modalId).modal('hide');
                    return true;
                }
                return result;
           // });
            //return confirm("Are you sure you want to leave this page as data you have entered may not be saved.");
        }
    },
    formcontrolvalue: {
        change: function () {
            $(':input').on('change', function () {
                //console.log('in1');
                if ($.trim($(this).val()) != "") {
                    $(this).parents('div').removeClass('has-error');
                    isDirty = true;
                }
                else {
                    $('.input-validation-error').parents('.form-group').addClass('has-error');
                    $('.field-validation-error').addClass('text-danger');
                    //$('.field-validation-error span').text(RequiredErrorMessage);
                }
            })
        },
        blur: function () {
            $(':input').blur(function () {
                //console.log('in2');
                if ($.trim($(this).val()) != "") {
                    isDirty = true;
                    $(this).parents('div').removeClass('has-error');
                }
                else {
                    $('.input-validation-error').parents('.form-group').addClass('has-error');
                    $('.field-validation-error').addClass('text-danger');
                    //$('.field-validation-error span').text(RequiredErrorMessage);
                }
            });

        }
    },
    formValidation: {
        validate: function () {
            $('.input-validation-error').parents('.form-group').addClass('has-error');
            $('.textarea-validation-error').parents('.form-group').addClass('has-error');
            $('.field-validation-error').addClass('text-danger');

            //$('.field-validation-error span').text($('.input-validation-error').attr("data-val-required"));
            //if ($('.input-validation-error').attr('data-val-range').length > 0)
            //{
            //    $('.field-validation-error span').text($('.input-validation-error').attr("data-val-range"));
            //}
        }
    },
    numericOnly: {
        click: function () {
            $(".numeric").keydown(function (event) {
                console.log(event.keyCode);
                if (event.shiftKey)
                    event.preventDefault();
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 189) {
                    console.log($(this).val());
                }
                else {
                    if (event.keyCode < 95) {
                        if (event.keyCode < 48 || event.keyCode > 57) {
                            event.preventDefault();
                        }
                    }
                    else {
                        if (event.keyCode < 96 || event.keyCode > 105) {
                            event.preventDefault();
                        }
                    }
                }
            });
        }
    },
    //getKendoDropDownList: function (id, url, valueField, textFeild, defaultValue, data, appentTo, IsFirstControl) {

    //    $(id).kendoDropDownList({
    //        optionLabel: ' ',
    //        filter: "contains",
    //        dataTextField: textFeild,
    //        dataValueField: valueField,
    //        //optionLabel: '---Select---',
    //        popup: { appendTo: $(appentTo) },
    //        dataSource: {
    //            transport: {
    //                read: {
    //                    url: webApiUri + url,
    //                    data: data,
    //                    beforeSend: function (xhr) {
    //                        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
    //                    }
    //                }
    //            }
    //        },
    //        template: function (data) {
    //            data.DisplayText = data[textFeild];
    //            return kendo.template($("#ddltemplate").html())(data);
    //        },
    //        dataBound: function () {
    //            if (IsFirstControl) {
    //                $(id).data("kendoDropDownList").focus();
    //            }
    //            var len = $(id).data("kendoDropDownList").dataSource.data().length;
    //            if (len >= 1) {
    //                this.select(1);
    //            }
    //            if (defaultValue == true && defaultValue != null) {
    //                $(id).data("kendoDropDownList").value(defaultValue);
    //            }
    //            defaultValue = null;
    //            $('.hideParentli').closest('li').hide();

    //        }
    //    });
    //},
    /***
Added: Sanish Regmi
***/
    RemoveGmtFromDate: function (date) {

        if (date.toString().length > 15) {
            var strDate = date.toString();
            var year = strDate.substr(11, 4),
                month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(strDate.toString().substr(4, 3)) + 1,
                day = strDate.substr(8, 2);

            strDate = (month < 10 ? '0' : '') + month + '/' + day + '/' + year;
            return strDate;
        } else {
            return date.toString();

        }

    },
    newAjaxCall: function (ajaxOptions, successCB, errorCB) {
            $.ajax({
                type: ajaxOptions.type,
                url: ajaxOptions.url,
                data: ajaxOptions.data,
                contentType: ajaxOptions.contentType,
                beforeSend: function (xhr) {
                    if (!ajaxOptions.disableAuth) {
                        xhr.setRequestHeader("Authorization", "Bearer " + ajaxOptions.access_token);
                    }
                },
                success: function (result) {
                    if (successCB)
                        successCB(result);
                },
                error: function (e) {
                    if (errorCB) {
                        errorCB(e);
                    }
                }
            });
    },
    getKendoDropdownList: function (bindOption) {
      $('#' + bindOption.element).kendoDropDownList({
            dataValueField: bindOption.valueField,
            dataTextField: bindOption.textField,
            optionLabel: '--Select--',
            filter: "startswith",
            popup: {
                appendTo: $(bindOption.element).closest(bindOption.appendToElement)
            },
            dataSource: {
                transport: {
                    read: {
                        url: bindOption.url + (bindOption.parameter != undefined ? "?" + bindOption.parameter : ""),
                        //data: bindOption.data,
                        contentType: 'application/json',
                        beforeSend: function (xhr) {
                            if (!bindOption.disableAuth) {
                                xhr.setRequestHeader("Authorization", "Bearer " + bindOption.accessToken);
                            }
                        }
                    }
                }
            },
            dataBound: function () {
                //var len = $('#' + bindOption.element).data("kendoDropDownList").dataSource.data().length;
                //            if (len >= 1) {
                //                this.select(1);
                //            }
                 }
        });
    },
    //Nishedh
      //$('#Busgrid').data('kendoGrid').dataSource.read();
      //$('#Busgrid').data('kendoGrid').refresh();
    kendoGridRefresh: function (name) {
        $(name).data('kendoGrid').dataSource.read();
        $(name).data('kendoGrid').refresh();
    },
    getKendoDropdownListSelected: function (bindOption) {
        $('#' + bindOption.element).kendoDropDownList({
            dataValueField: bindOption.valueField,
            dataTextField: bindOption.textField,
           // optionLabel: '--Select--',
            filter: "startswith",
            popup: {
                appendTo: $(bindOption.element).closest(bindOption.appendToElement)
            },
            dataSource: {
                transport: {
                    read: {
                        url: bindOption.url + (bindOption.parameter != undefined ? "?" + bindOption.parameter : ""),
                        //data: bindOption.data,
                        contentType: 'application/json',
                        beforeSend: function (xhr) {
                            if (!bindOption.disableAuth) {
                                xhr.setRequestHeader("Authorization", "Bearer " + bindOption.accessToken);
                            }
                        }
                    }
                }
            },
            dataBound: function () {
                //var len = $('#' + bindOption.element).data("kendoDropDownList").dataSource.data().length;
                //            if (len >= 1) {
                //                this.select(1);
                //            }
            }
        });
    },
    GetTimeRemovingGMT: function (date) {

        var time = '';
        var strDate = date.toString().replace(' (Nepal Standard Time)', '');
        if (strDate.length > 8) {
            time = strDate.toString().substr(16, 8);
        } else {
            time = strDate;
        }
        return time;

    },

    SetFocus: function (targetId, targetElementType) {

        if (targetElementType == 1) { //for kendo dropdownlist        
            setTimeout(function () { $("#" + targetId).data("kendoDropDownList").focus(); }, 1000);
        }
        else { // default as textbox
            setTimeout(function () { $("#" + targetId).focus(); }, 1000);
        }


    },
    validateDate: function (val) {

        if (val != null) {
            var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
            return dtRegex.test(val);
        } else {

            return false;
        }

    },

    validateEmail: function (val) {
        if (val != null) {
            var emailRegx = new RegExp(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);
            return emailRegx.test(val);
        } else {
            return false;
        }

    }
}


//Navigation ObjectActions
function GetNavigationObjectActionForButtons(navigationId, roleId, btnArray) {

    $.ajax({
        url: webApiUri + "/Common/RoleNavigationObjectAction",
        type: 'GET',
        async: false,
        data: { navigationId: navigationId, roleId: roleId },
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
        },
        success: function (result) {
            $.each($.parseJSON(btnArray), function (k, btnVal) {
                var btn = $.grep(result, function (val, key) {
                    return val.ActionName == k;
                });
                if (btn.length > 0) {
                    if (!$('#' + btnVal).hasClass('dontRemove')) {
                        $('#' + btnVal).show();
                    }
                }
                else {
                    $('#' + btnVal).remove();
                }
            });
        }
    });
}
function getUrlVars(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function OverRideFilterHelpText() {
    var filterable = {
        // messages: { info: filterInfoMsg, filter: filterButtonText, clear: ClearButtonText, itemsPerPage: 'sdf' },
        extra: false,
        operators: {
            text: {
                startswith: 'Starts with',
                eq: 'Is equal to ',
                contains: 'Contains',
                neq: 'Is not equal to',
                doesnotcontain: 'Does not contain',
                endswith: 'Ends with'
            },
            string: {
                startswith: 'Starts with',
                eq: 'Is equal to ',
                contains: 'Contains',
                neq: 'Is not equal to',
                doesnotcontain: 'Does not contain',
                endswith: 'Ends with'
            },
            number:
            {
                gt: 'Greater than',
                lt: 'Less than',
                eq: 'Is equal to',
                gte: 'Greater than equal to',
                lte: 'Less than equal to'
            },
            int:
            {
                gt: 'Greater than',
                lt: 'Less than',
                eq: 'Is equal to',
                gte: 'Greater than equal to',
                lte: 'Less than equal to'
            },
            integer:
            {
                gt: 'Greater than',
                lt: 'Less than',
                eq: 'Is equal to',
                gte: 'Greater than equal to',
                lte: 'Less than equal to'
            },
            decimal:
            {
                gt: 'Greater than',
                lt: 'Less than',
                eq: 'Is equal to',
                gte: 'Greater than equal to',
                lte: 'Less than equal to'
            },
            money:
            {
                gt: 'Greater than',
                lt: 'Less than',
                eq: 'Is equal to',
                gte: 'Greater than equal to',
                lte: 'Less than equal to'
            },
            date:
            {
                gt: 'Greater than',
                lt: 'Less than',
                eq: 'Is equal to',
                gte: 'Greater than equal to',
                lte: 'Less than equal to'
            },
            datetime:
            {
                gt: 'Greater than',
                lt: 'Less than',
                eq: 'Is equal to',
                gte: 'Greater than equal to',
                lte: 'Less than equal to'
            }
        }
    }

    return filterable;
}


function DisableSaveButton(event, isDisable) {

    if (isDisable == "disable") {
        $(event.target).find("span").html('Saving..');
        $(event.target).attr("disabled", "disabled");
    }
    else {
        $(event.target).find("span").html('Save');
        $(event.target).removeAttr("disabled");
    }

}
function SetDefaultFocus(targetElement, targetElementType) {

    if (targetElementType == 1) { //for kendo dropdownlist        
        setTimeout(function () { $("#" + targetElement).data("kendoDropDownList").focus(); }, 400);
    }
    else { // default as textbox
        setTimeout(function () { $("#" + targetElement).focus(); }, 400);
    }
}

function Numeric(AllowDecimal, AllowNegative) {
    $(".numeric").numeric({ decimal: false, negative: false });
    if (AllowDecimal == true && AllowNegative == false) {
        $(".numeric").numeric({ decimal: ".", scale: 5, negative: false });
    }
    else if (AllowDecimal == true && AllowNegative == true) {
        $(".numeric").numeric({ decimal: ".", scale: 5, negative: true });
    }
    else if (AllowDecimal == false && AllowNegative == true) {
        $(".numeric").numeric({ decimal: false, negative: true });
    }
}
function autoScrollTop() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
}
function checkCells(gridname) {
    // debugger;
    var errCount = 0;
    var grid = $(gridname).data("kendoGrid");
    var rows = grid.tbody.find("tr");                   //get rows


    for (var i = 0; i < rows.length; i++) {

        var rowModel = grid.dataItem(rows[i]);          //get row data

        //  var myValidator = rowModel.editable;
        //  displayErrors(myValidator);

        if (rowModel && rowModel.isNew()) {

            var colCells = $(rows[i]).find("td");       //get cells
            // displayErrors(colCells);
            for (var j = 1; j < colCells.length; j++) {
                if ($(colCells[j]).hasClass('k-group-cell'))
                    continue;                           //grouping enabled will add extra td columns that aren't actual columns

                grid.editCell($(colCells[j]));          //open for edit

                if (!grid.editable.end()) {             //trigger validation
                    //errCount++;
                    // continue;
                    return false;                       //if fail, return false
                }
                else {
                    grid.closeCell();                   //if success, keep checking
                }
            }

            //if (errCount > 0) {
            //    return false;
            //}


        }
    }
    return true;
}



function displayErrors(validator) {
    // debugger;
    var errorList = $('ul.errorMessages');
    errorList.empty();
    var myerrors = validator._errors;
    var count = 0;
    $.each(myerrors, function (field, errmsg) {
        //Set focus on first field
        if (count === 0) {
            $('#' + field).focus();
            count++;
        }
        //Set css
        $('#' + field).css({
            'box-shadow': '0 0 5px #d45252',
            'border-color': '#b03535'
        });
        var titlerrmsg = $('#' + field).attr("title");
        var friendly = $('#' + field).attr("data-myfriendly");
        errorList.append('<li><span>' + friendly + ' is</span> ' + titlerrmsg + '</li>');
    });
    errorList.show();
}


function AjaxPost(postUrl, postData, successMessage, errorMessage, successCallback, errorCallback, asyncParam) {
    if (asyncParam + '' == 'undefined') {
        asyncParam = true;
    }
    $.ajax({
        //async: asyncParam,
        async: false,
        contentType: 'application/json;charset=utf-8',
        type: 'POST',
        dataType: 'JSON',
        url: postUrl,
        data: postData,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        },
        success: function (response) {
            if (successMessage == "DFM") {
                ShowMessage('success', '', 'Request successfully completed.');
            } else if (successMessage != "undefined" && successMessage.length >= 5) {
                ShowMessage('success', '', successMessage);
            }

            if (successCallback) {
                successCallback(response);
            }
        },
        error: function (response) {
            if (errorMessage == "DFM") {
                ShowMessage('error', '', 'Request unable to completed.');
            } else if (errorMessage != "undefined" && errorMessage.length >= 5)
                if (errorMessage.length >= 5) {
                    ShowMessage('error', '', errorMessage);
                }

            if (errorCallback) {
                errorCallback(response);
            }
        }
    });
}

function AjaxGet(postUrl, postData, successMessage, errorMessage, successCallback, errorCallback, asyncParam) {
    if (asyncParam + '' == 'undefined') {
        asyncParam = true;
    }
    $.ajax({
        async: asyncParam,
        contentType: 'application/json;charset=utf-8',
        type: 'GET',
        dataType: 'JSON',
        url: postUrl,
        data: postData,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        },
        success: function (response) {

            if (successMessage == "DF") {
                ShowMessage('success', '', 'Request successfully complete.');
            } else if (successMessage.length >= 5) {
                ShowMessage('success', '', successMessage);
            }

            if (successCallback) {
                successCallback(response);
            }
        },
        error: function (ret) {
            if (errorMessage == "DF") {
                ShowMessage('success', '', 'Request unable to complete.');
            } else if (errorMessage.length >= 5)
                if (errorMessage.length >= 5) {
                    ShowMessage('error', '', errorMessage);
                }
            if (errorCallback) {
                errorCallback(ret);
            }
        }
    });
}

function AjaxFormPost(postUrl, sourceFormId, successMessage, errorMessage, successCallback, errorCallback, asyncParam) {

    if (asyncParam + '' == 'undefined') {
        asyncParam = true;
    }

    $.ajax({
        async: asyncParam,
        contentType: 'application/json;charset=utf-8',
        type: 'POST',
        dataType: 'JSON',
        url: postUrl,
        data: $('#' + sourceFormId).serialize(),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        },
        success: function (response) {

            if (successMessage == "DFM") {
                ShowMessage('success', '', 'Request successfully completed.');
            } else if (successMessage.length >= 5) {
                ShowMessage('success', '', successMessage);
            }

            if (successCallback) {
                successCallback(response);
            }
        },
        error: function (ret) {
            if (errorMessage == "DFM") {
                ShowMessage('success', '', 'Request unable to completed.');
            } else if (errorMessage.length >= 5)
                if (errorMessage.length >= 5) {
                    ShowMessage('error', '', errorMessage);
                }

            if (errorCallback) {
                errorCallback(ret);
            }
        }
    });
}


