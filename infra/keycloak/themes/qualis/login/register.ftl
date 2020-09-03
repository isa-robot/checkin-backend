<#import "template.ftl" as layout>
<script src="https://kit.fontawesome.com/31bdf6bfbd.js" crossorigin="anonymous"></script>
<@layout.registrationLayout; section>
    <#if section = "header">
        ${msg("registerTitle")}
    <#elseif section = "form">
        <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('firstName',properties.kcFormGroupErrorClass!)}">
                <div class="${properties.kcInputWrapperClass!} ${properties.kcUsernameField}">
                    <i class="far fa-user"></i>
                    <input type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName" placeholder="Nome" value="${(register.formData.firstName!'')}" />
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('lastName',properties.kcFormGroupErrorClass!)}">
                <div class="${properties.kcInputWrapperClass!} ${properties.kcUsernameField}">
                    <i class="far fa-user"></i>
                    <input type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName" placeholder="Sobrenome" value="${(register.formData.lastName!'')}" />
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('email',properties.kcFormGroupErrorClass!)}">
                <div class="${properties.kcInputWrapperClass!} ${properties.kcUsernameField}">
                    <i class="fas fa-envelope"></i>
                    <input type="text" id="email" class="${properties.kcInputClass!}" name="email" placeholder="Email" value="${(register.formData.email!'')}" autocomplete="email" />
                </div>
            </div>

          <#if !realm.registrationEmailAsUsername>
            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('username',properties.kcFormGroupErrorClass!)}">
                <div class="${properties.kcInputWrapperClass!} ${properties.kcUsernameField}">
                    <i class="fas fa-user"></i>
                    <input type="text" id="username" class="${properties.kcInputClass!}" placeholder="Nome de usuário" name="username" value="${(register.formData.username!'')}" autocomplete="username" />
                </div>
            </div>
          </#if>

            <#if passwordRequired??>
            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password',properties.kcFormGroupErrorClass!)}">
                <div class="${properties.kcInputWrapperClass!} ${properties.kcUsernameField}">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="password" class="${properties.kcInputClass!}" placeholder="Digite sua senha" name="password" autocomplete="new-password"/>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('password-confirm',properties.kcFormGroupErrorClass!)}">
                <div class="${properties.kcInputWrapperClass!} ${properties.kcUsernameField}">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="password-confirm" class="${properties.kcInputClass!}" placeholder="Confirme sua senha" name="password-confirm" />
                </div>
            </div>
            </#if>

            <#if recaptchaRequired??>
            <div class="form-group">
                <div class="${properties.kcInputWrapperClass!} ${properties.kcUsernameField}">
                    <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                </div>
            </div>
            </#if>

            <div class="${properties.kcFormGroupClass!}">

                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doRegister")}"/>
                </div>
                <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                        <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                    </div>
                </div>
            </div>
        </form>

    </#if>
</@layout.registrationLayout>
