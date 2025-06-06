export interface Theme{
    appbackground: string;
    appColor: string;
    appDefaultStroke: string;
    appLogo: string;
    appSkeletonFrom: string;
    appSkeletonTo: string;
    buttons: {
        alert: string;
        alertColor: string;
        alertHover: string;
        disable: string;
        disableColor: string;
        primary: string;
        primaryColor: string;
        primaryHover: string;
        secondary: string;
        secondaryColor: string;
        secondaryHover: string;
        success: string;
        successColor: string;
        successHover: string;
        warning: string;
        warningColor: string;
        warningHover: string;
        white: string;
        whiteColor: string;
        whiteHover: string;
    }
    card:{
        alert: string;
        background: string;
        header: string;
        success: string;
        warning: string;
    }
    textInput: {
        active: string;
        activeColor: string;
        borderColor: string;
        disabled: string;
        disabledBorderColor: string;
        disabledColor: string;
        placeholderColor: string;
    }
    typographies: {
        error:string;
        subtitle: string;
        success: string;
    }
}