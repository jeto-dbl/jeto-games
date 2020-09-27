/*
    Any modification here must be done in './dimens.scss'
*/

const DIMENS = {
    smallMobileWidth: '576px',
    mobileWidth: "768px",
    largeMobileWidth: '992px',
    xtraLargeMobileWidth: '1200px',
    barrierHeight: `60px`, 
    dashboardWidth: "250px",
    scrollButtonDim: '48px',
    scoreBoardWidth: "150px",
    scoreBoardHeight: "30px",
}

const DIMENS_INT = { // Unit in pixels
    smallMobileWidth: 576,
    mobileWidth: 768,
    largeMobileWidth: 992,
    xtraLargeMobileWidth: 1200,
    barrierHeight: 60, // same as barrierHeight in DIMENS object
    dashboardWidth: 250,
    scrollButtonDim: 48,
    fieldMargin: 30,
    scoreBoardWidth: 150,
    scoreBoardHeight: 30, // approx from css style

    zIndexNeg10: -10,
    zIndexNeg20: -20,
    zIndexNeg30: -30,
    zIndexNeg40: -40,
    zIndexNeg50: -50,
    zIndexNegMax: -999,
    zIndex10: 10,
    zIndex20: 20,
    zIndex30: 30,
    zIndex40: 40,
    zIndex50: 50,
    zIndexMax: 999,
}

const DURATIONS = { // Unit in milliseconds
    dashboardTransitionDuration: 500,
    scrollButtonTransitionDuration: 1000,
}

export {
    DIMENS,
    DIMENS_INT,
    DURATIONS,
}