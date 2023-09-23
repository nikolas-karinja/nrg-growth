export const SERVICE_ID = 7582

// price -> number, live stripe price-id, test stripe price-id 
export const list = [
    {
        name          : 'Premium',
        followers     : 5000,
        basePrice     : 34.99,
        discountPrice : [14.99, 'price_1NqQWAAv9fMSPsP73EG1Uex5', 'price_1NrttkAv9fMSPsP730lmveXL'],
        femalePrice   : [4.99, 'price_1NqQWAAv9fMSPsP7A44yiALC', 'price_1NrttkAv9fMSPsP7ZgJMoRxW'],
        usaPrice      : [4.99, 'price_1NqQWAAv9fMSPsP73EpIxVOW', 'price_1NrttkAv9fMSPsP7m6YnqGq1'],
        subPrice      : [19.99, 'price_1NqQWAAv9fMSPsP7STCe93kN', 'price_1NrttkAv9fMSPsP7vW0Yq73f'],
        processingFee : [0.79, 'price_1NqRIuAv9fMSPsP7bmcEq55J', 'price_1NrttkAv9fMSPsP7nbvFFtRY'],
    },
    {
        name          : 'Starter',
        followers     : 500,
        basePrice     : 14.99,
        discountPrice : [0.99, 'price_1NqQTeAv9fMSPsP7MspwenoN', 'price_1NqQ5yAv9fMSPsP74RpTKS5t'],
        femalePrice   : [0.99, 'price_1NqQTeAv9fMSPsP7x8t7f8Gi', 'price_1NqQ5yAv9fMSPsP7je84ZLbA'],
        usaPrice      : [0.99, 'price_1NqQTeAv9fMSPsP7ynApP4Re', 'price_1NqQ5yAv9fMSPsP72ihU3aTf'],
        subPrice      : [19.99, 'price_1NqQTeAv9fMSPsP7jPGnF3Tu', 'price_1NqQ5yAv9fMSPsP7GrN0j5KX'],
        processingFee : [0.79, 'price_1NqRJEAv9fMSPsP7IjU3c7fc', 'price_1NrtrLAv9fMSPsP7uwOFX3hG'],
    },
    {
        name          : 'Popular',
        followers     : 10000,
        basePrice     : 99.99,
        discountPrice : [19.99, 'price_1NqQYaAv9fMSPsP72tQKjCCX', 'price_1Nrtz2Av9fMSPsP7rYYNdGDI'],
        femalePrice   : [4.99, 'price_1NqQYaAv9fMSPsP7Yqq2hBdz', 'price_1Nrtz2Av9fMSPsP7M5e17RD1'],
        usaPrice      : [4.99, 'price_1NqQYaAv9fMSPsP7jkkVcpvZ', 'price_1Nrtz2Av9fMSPsP7fOkk9l4z'],
        subPrice      : [19.99, 'price_1NqQYaAv9fMSPsP7JZO8WDUF', 'price_1Nrtz2Av9fMSPsP7BRDWYxWU'],
        processingFee : [0.79, 'price_1NqRI1Av9fMSPsP7Mrgk0UEy', 'price_1Nrtz2Av9fMSPsP7TecC3CHJ'],
    },
]