var email = "", pwd = "", checked = true;

const update = function (id, targetId, inputErrorId) {
    let newValue = document.getElementById(id).value;
    email = id === 'email-field' ? newValue : email;
    pwd = id === 'pwd-field' ? newValue : pwd;
    updateStyle(targetId);
    checkAndUpdate(id, inputErrorId);
    adjustLoginFormHeight();
}

const inputOnFocus = function (id, targetId, boxId) {
    updateStyle(targetId, document.getElementById(id).value);
    let box = document.getElementById(boxId);
    box.style.backgroundColor = 'rgb(70, 70, 70)';
}

const updateStyle = function (targetId) {
    let el = document.getElementById(targetId);
    el.style.top = '7px';
    el.style.fontSize = '10px';
    el.style.opacity = '50%';
}

const inputOnBlur = function (id, targetId, boxId, inputErrorId) {
    let el = document.getElementById(targetId);
    let field = document.getElementById(id);
    let box = document.getElementById(boxId);
    let value = field.value;
    box.style.backgroundColor = '#363636';
    if(value.toString().length === 0) {
        el.style.top = '15px';
        el.style.fontSize = '16px';
        el.style.opacity = '60%';
    }
    checkAndUpdate(id, inputErrorId);
    adjustLoginFormHeight();
}

const checkAndUpdate = function (id, inputErrorId) {
    let field = document.getElementById(id),
        inputError = document.getElementById(inputErrorId);

    if(!isValid(id)) {
        adjustLoginButtonContainer(id, 24)
        field.style.borderBottomWidth = '2px';
        field.style.borderBottomColor = '#E87C03';
        inputError.style.display = 'block';
    } else {
        adjustLoginButtonContainer(id);
        field.style.borderBottomWidth = '0';
        field.style.borderBottomColor = 'transparent';
        inputError.style.display = 'none';
    }
}

const adjustLoginButtonContainer = function (id, pixels = 40) {
    let px = pixels + 'px'
    if(id === 'pwd-field') {
        document.getElementById('login-button-container').style.marginTop = px;
    }
}
const isValid = function (elementId) {
    if(elementId === 'email-field') {
        let email_OK = false, emailArray = email.split('@');
        if (emailArray.length === 2) {
            if (emailArray[1].length > 1) {
                let innerEmailArray = emailArray[1].split('.');
                if (innerEmailArray.length > 1) {
                    if (innerEmailArray[1].length > 0) {
                        email_OK = true;
                    }
                }
            }
        }
        let phone_OK = ((!isNaN(email)) && (email.length > 7));
        return email_OK || phone_OK;
    }
    if(elementId === 'pwd-field') {
        return (pwd.length > 3);
    }
    return false;
}

const toggleCheckBox = function () {
    checked = !checked;
    document.getElementById('icon').style.display = checked ? 'inherit' : 'none';
    let checkbox = document.getElementById('checkbox');
    checkbox.focus();
    checkbox.style.opacity = '100%';
}

const checkBoxOnBlur = function () {
    checkbox.style.opacity = '60%';
}

const adjustLoginFormHeight = function () {
    let emailError = isHidden(document.getElementById('email-inputError')),
        pwdError = isHidden(document.getElementById('pwd-inputError'));
    console.log(emailError, pwdError);
    document.getElementById('log-in-form').style.height = !emailError && !pwdError ? 'fit-content' : '340.667px';
}

const isHidden = function (el) {
    return (el.offsetParent === null)
}

const showTermsOfUse = function () {
    document.getElementById('learn-more').style.visibility = 'hidden';
    document.getElementById('terms-of-use').style.visibility = 'visible';
}

exports = {
    update, 
    inputOnFocus, 
    updateStyle, 
    inputOnBlur, 
    toggleCheckBox, 
    checkBoxOnBlur,
    showTermsOfUse
}