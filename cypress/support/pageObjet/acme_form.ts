const Acme_Demo_Form = () => {
  
      before(function () {
        cy.fixture('acme.json').then(function (data) {
          this.data = data;
        })
      })

      it.only("Filling the ACME demo form ", function(){
        
        cy.visit ("/app/public/apply/89577a55-6211-4ebb-85ad-dbbb69c59d8e/applications/step2/")

        //Please enter the number of adults in the household
         cy.get(clickNoOfaAdults).click()
        // cy.get(NoOfaAdults).click()
        cy.get('ul.MuiList-root.MuiMenu-list.MuiList-padding').contains(this.data.adultHouseHold).click()
        
        //Please enter the number of children in the household
        cy.get(clickChildrenInHouseHold).click()
        cy.get("ul.MuiList-root.MuiMenu-list.MuiList-padding").contains(this.data.childrenInHouseHold).click()

        //Please enter the number of applicants
        cy.get("[aria-describedby='noOfPeopleOnContract']").click()
        cy.get("ul.MuiList-root.MuiMenu-list.MuiList-padding").contains(this.data.noOfApplicaint).click()

        //Please enter the number of applicants
        cy.get(firstName).type(this.data.firstName)
        cy.get(lastName).type(this.data.lastName)

        // if adults in the household > then 1
            if(this.data.adultHouseHold > 1 || this.data.noOfApplicaint > 1)
            {
              cy.get(firstName2).type(this.data.firstName2)
              cy.get(lastName2).type(this.data.lastName2)
              cy.get("button:nth-child(3)").should("contain", this.data.firstName2)
            }
            
        cy.get("button:nth-child(2)").should("contain", this.data.firstName)
        cy.get(this.data.next).click()
        
        //Rental period
        cy.get(rentalPeriod).click()
        //Select Rental period date
        cy.get(':nth-child(122)').click()
        //Click ok
        cy.get(ok).click()

        //Feed 
        cy.get(feedback).click({force: true})
        cy.get(selectFriend).click()

        //Basic Information
        cy.get(basicInfo).click()
        cy.get(selectMr).click()
        //Date of birth
        cy.get(clickBasicDOB).click()
        cy.get(selectBasicDOB).click()
        cy.get('.MuiDialogActions-root > :nth-child(3)').click()
        //Family status
        cy.get(clickFamilyStatus).click()
        cy.get(selectFamilyStatus).click()
        //Phone Number
        cy.get(phoneNumber).type(this.data.phoneNumber)
        //Email
        cy.get(basiEmail).type(this.data.basicEmail)
       
        //Current Address
        cy.get(street).type(this.data.street)
        cy.get(number).type(this.data.number)
        cy.get(zipCode).type(this.data.zipCode)
        cy.get(tenanSince).type(this.data.tenanSince)
        cy.get(clickReasonForMoving)
        .click()
        cy.get(selectReasonOfMoving).click()
        
        //Current Employer
        cy.get(clickEmpolymentType)
        .click()
        //Employment type
        cy.get(selectEmplymentType).click()
        //Occupation 
        cy.get(occupation).type(this.data.occupation)
        // Net monthly household income (incl. guarantor, if appl.) 
        cy.get(clickMonthlyIncome).click()
        //select range
        cy.get(selectRangeOfMonthlyIncome).click()
        //Net monthly income 
        cy.get(netIncome).type(this.data.netIncome)
        //Employer name 
        cy.get(EmployerName).type(this.data.EmployerName)
        //Select Limited/Unlimited contract? *
        cy.get(clickContractType).click()
        cy.get(selectContract).click()
        //Other income sources 
        cy.get(otherIncomeSource).type(this.data.otherIncomeSource)
        //How long have you been employed here 
        cy.get(employmentPeriod).type(this.data.employmentPeriod)
        
        //Is your net income sufficient to pay the rent also after deducting current liabilities (maintenance obligations, credit, car insurance, etc.)?
        cy.get(inIncomeEnough).eq(0)
        .click()        
        //If select No Please provide more information
        cy.get(incomeNotEnoughReason).type(this.data.incomeNotEnoughReason)
        
        //Household information
        cy.get(noTotalPeopleMovingIn).should("have.value", this.data.adultHouseHold + this.data.childrenInHouseHold)
        cy.get(houseHoldPerson).should("contain.text", this.data.adultHouseHold + this.data.childrenInHouseHold)

      if(this.data.adultHouseHold > 1)
      {
        for (let j = 0; j < this.data.adultHouseHold + this.data.childrenInHouseHold -2; j++)
           
        { 
          cy.get("[aria-describedby='applications[0].applicationFormData.householdPersons.values["+j+"].name']")
          .type(this.data.houseHoldPersonName)
          cy.get("[aria-describedby='applications[0].applicationFormData.householdPersons.values["+j+"].birthDate']")
          .click()
          cy.get(':nth-child(10'+j+')').click()
          cy.get(ok).click()
          cy.get("[name='applications[0].applicationFormData.householdPersons.values["+j+"].relationship']")
          .type(this.data.houseHoldRelationship)
          cy.get("[name='applications[0].applicationFormData.householdPersons.values["+j+"].netMonthlyIncome']")
          .type(this.data.houseHoldNetIncome)
        }
      }else
      {
        for (let j = 0; j < this.data.adultHouseHold + this.data.childrenInHouseHold -1; j++)
           
        { 
          cy.get("[aria-describedby='applications[0].applicationFormData.householdPersons.values["+j+"].name']")
          .type(this.data.houseHoldPersonName)
          cy.get("[aria-describedby='applications[0].applicationFormData.householdPersons.values["+j+"].birthDate']")
          .click()
          cy.get(':nth-child(10'+j+')').click()
          cy.get(ok).click()
          cy.get("[name='applications[0].applicationFormData.householdPersons.values["+j+"].relationship']")
          .type(this.data.houseHoldRelationship)
          cy.get("[name='applications[0].applicationFormData.householdPersons.values["+j+"].netMonthlyIncome']")
          .type(this.data.houseHoldNetIncome)

        }
    }
        //Is Anyone smoking
        cy.get(IsAnyOneSmoking).eq(0)
        .click()
        //Do you have pets
        cy.get(DoYouHavePets).eq(0)
        .click()
        //Have you ever been late or delinquent on rent?
        //cy.get(delinquentOrRent)
        cy.get("[aria-describedby='applications[0].applicationFormData.hasPets.checked']")
        .click()
        // cy.get(hadRentIssues)
        // .type(this.data.hadRentIssues)

        //Are you currently involved in a foreclosure or have you been foreclosed on?
        cy.get(involvedInForecloserOrForeClose)
        .click()

        //Other information about how the apartment will be used
        cy.get(apartmentUse)
        .type(this.data.apartmentUse)

        //Have you ever filed for bankcruptcy and/or have you, or a co-owner, issued an affidavit in the past last three years? (If so, when and explanation)
        cy.get(bankcruptcyOrCoOwner)
        .click()
        
        //Is there an out-of-court debt settlement procedure/has an attempt at settlement failed in the last six months?
        cy.get(outOfCourt)
        .click()

        //Upload file
        cy.get(uploadFile)
        .attachFile(this.data.uploadFile, { subjectType: 'drag-n-drop' })
        //Confirmation information checkbox
         cy.get("[name='applications[0].applicationFormData.truthfulnessConfirmation']").click()
          cy.get('canvas')
          .click(80, 75)

         cy.get('canvas')
      .trigger('pointerdown',  {
        x: 250, 
        y: 100,
        isPrimary: true,
      })
      .trigger('pointermove', { x: 180, y: 140 })
      .trigger('pointerup', { x: 180, y: 140 });

        //Click Next button
        cy.get(next).click()

        if(this.data.noOfApplicaint > 1)
        {
          //Verify the applicaint name 
          cy.get("button:nth-child(3)").should("contain", this.data.firstName2)

          cy.get("[aria-describedby='applications[1].applicationFormData.salutation']").click()
          cy.get("[data-value='ms']").click()
          //Date of birth
          cy.get("#birthDate").click()
          cy.get(':nth-child(120)')
          cy.get(ok).click()

          //family status
          cy.get("[aria-describedby='applications[1].applicationFormData.familyStatus']").click()
          cy.get("[data-value='married']").click()

          //Phone Number
          cy.get(phoneNumber).type("4113587903")
          //Email
          cy.get(basiEmail).type("taimur.aamer@gmail.com")
        
          //Current Address
          cy.get(street).type("Voluptatum molestias")
          cy.get(number).type("64367")
          cy.get(zipCode).type("76394")
          cy.get("#tenantSince").type("Laborum et consequat")
          //cy.get("#mui-component-select-applications[1].applicationFormData.reasonForMoving.selectedValue")
          //.click({force:true})
          //cy.get("[data-value='NEW_JOB']").click()

          //Current Eployer
          cy.get("[aria-describedby='applications[1].applicationFormData.employmentType.selectedValue']").click()
          cy.get("[data-value='STUDENT']").click()
          //occupation
          cy.get("#occupation").type("Engineer")
          //net monthly income
          cy.get("[aria-describedby='applications[1].applicationFormData.netMonthlyIncomeRanges']").click()
          cy.get('.MuiList-root > :nth-child(8)').click()
          //Monthly income
          cy.get("#netMonthlyIncome").type("2342")
          //Employer name
          cy.get("#employerName").type("Aamer")
          cy.get("[aria-describedby='applications[1].applicationFormData.limitedOrUnlimitedContract']").click()
          //Select Unlimited
          cy.get("[data-value='UNLIMITED']").click()
          //Other income source
          cy.get("#otherIncomeSources").type("Nothing")
          //Eployment period
          cy.get("#employmentPeriod").type("Two year")
          //Is income is Enough
          cy.get("[aria-describedby='applications[1].applicationFormData.isIncomeEnough.checked']").click()
          //Upload File
          cy.get("[aria-describedby='applications[1].applicationFormData.copyOfEmploymentContract']")
          .attachFile(this.data.uploadFile, { subjectType: 'drag-n-drop' })
          //Agreement checkbox
          cy.get("[name='applications[1].applicationFormData.truthfulnessConfirmation']").click()
          //Sign in convas
          cy.get('canvas')
          .click(80, 75)

          cy.get(next).click()
        }

        //Third Page   
        //Email
        cy.get("#email").clear().type(`test+${Math.floor(Math.random() * 1000)}@gmail.com`)
        //Pasword
        cy.get("#password").type(this.data.password)
        //Repeat Pasword
        cy.get("#repeatPassword").type(this.data.password)
        //Agreement checkbox
        cy.get("[name='areTermsAccepted']").click()
        //verify first name in tab
        cy.get("button:nth-child(2)").should("contain", this.data.firstName)
        
        //Register & Submit rental application
        cy.get('form > .MuiButton-root > .MuiButton-label').click()
        cy.wait(2000)
        //Popup Should be visible
        cy.get("[role='dialog']").should("be.visible")
        //Click submit form
        cy.get('.MuiButton-textPrimary > .MuiButton-label > span').click()
        //Click ok
        //cy.get('.MuiButton-textPrimary > .MuiButton-label > span').contains("Ok").click()
        cy.get(".MuiDialogActions-root > button").contains("Ok").click()
     // cy.get('.MuiButton-textPrimary > .MuiButton-label > span').eq(1).click()

      })



      it.only("Create user through api ", function(){
        //part one
        cy.request({
          method: "POST",
          url: "/accounts/users/register", 
          body: {
            isActive: true,
            username: "taimur888@gmail.com",
            password: "Admin@123",
            repeatPassword: "Admin@123",
            areTermsAccepted: true
        }
        }).then(resp => {
          expect(resp.status).to.eq(200)
        })
        //part two
        cy.request({
          method: "POST",
          url: "/accounts/oauth/token",
          body: {
            grant_type: 'password',
            username: "taimur888@gmail.com",
            password: "Admin@123",
            scope: 'offline_access *',
            client_id: "dbf8fc00-d7e1-11e6-be11-4df610fa68f6",
            client_secret: "9864b910-d742-11e6-b754-976f8d441951",
        }
        }).then(resp => {
          expect(resp.status).to.eq(200)
        })
        //part three
        cy.request({
          method: "GET",
          url: "/userinfo?t=1613901747531", 
        headers: {'content-type': 'application/json', Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMWI4MDNhYy04ZjA5LTQ1MjYtYmZiYy1iZDdiMTAxMjYwMmMiLCJzdWIiOiJlMjU4NTcyZS0wY2FlLTQ1MTktODFhYy1kNGFjYjYwNmUwYjgiLCJleHAiOjE2MTM5MzQxMzAsImlhdCI6MTYxMzkzMDUzMH0.YEFJViitYVvJz9bw3Wpn2iV6Dl-P_rbw-0Uyt8oLeOY9HljPZo_cZHlWSZkkoJO4W0xjZi8OWKzPGwvg-QJskpaWSU9dIXH5cBuOHAHIV_FnQfr49rqJD3_maqGCwp3JSAdYRBIepJN6ZwM6GRWLTiyIebJ_ygMZobbIrPFHpEtMLzyX2QiS8nIeAAtHdztj9kSRR0NZ5U0mEN59IsYSmQ1zPHR9hlUn-tU6vhp1DIWR4BPZUOKv_RtkC6XIyONlKGMGAf1eXblqPumhUvaC8irEbFVk9KgtmdiHmKVGKLi9-FfEO1J3uZEYrDag7PQ9ZUwGc-e-vPRI0RZoyziCVw'}
        }).then(resp => {
          const token = resp.body.bearerToken;
          expect(resp.status).to.eq(200)
        
        cy.request({
          method: 'POST',
          url: '/prism/listing/89577a55-6211-4ebb-85ad-dbbb69c59d8e/applicants?t=1613901752639',
          body: {
            "applications": [
                {
                    "isMainCandidate": true,
                    "email": "taimur888@gmail.com",
                    "applicationFormData": {
                        "lastName": "Aamer",
                        "signatureData": {
                            "date": "2021-02-21T10:00:05.339Z",
                            "signature": "data:image/png;base64,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"
                        },
                        "street": "max planks ring",
                        "isIncomeEnough": {
                            "checked": true
                        },
                        "noTotalPeopleMovingIn": 1,
                        "tagSettlementOfDebts": false,
                        "employmentType": {
                            "selectedValue": "STUDENT"
                        },
                        "employerName": "Taimur-employer",
                        "isAnyoneSmoking": false,
                        "number": "16",
                        "noOfChildrenMovingIn": 0,
                        "copyOfEmploymentContract": [
                            {
                                "name": "QA technical challenge_2 (1).pdf",
                                "resourceId": "09151a22-042d-4fdf-bb17-1f693c1cf477.pdf",
                                "resourcePath": "listing/89577a55-6211-4ebb-85ad-dbbb69c59d8e/form-data/25e6fdfa-0103-4bf2-98c9-cb1d1db574ca/09151a22-042d-4fdf-bb17-1f693c1cf477.pdf/09151a22-042d-4fdf-bb17-1f693c1cf477.pdf",
                                "size": 28483,
                                "type": "application/pdf",
                                "order": 0
                            }
                        ],
                        "occupation": "Student",
                        "feedbackQuestion": {
                            "selectedValue": "YOUR_WEBSITE"
                        },
                        "employmentPeriod": "4",
                        "taghasFiledBankruptcyAndNegativeSchufaEntries": {
                            "checked": false
                        },
                        "birthDate": "1994-02-21T07:00:00.000Z",
                        "zipCode": "25000",
                        "hasPets": {
                            "checked": false
                        },
                        "netMonthlyIncomeRanges": {
                            "from": 6000,
                            "to": 6500
                        },
                        "tenantSince": "2020",
                        "currency": "EUR",
                        "reasonForMoving": {
                            "selectedValue": "HOUSING_SIZE"
                        },
                        "hadForeclosure": {
                            "checked": false
                        },
                        "familyStatus": "single",
                        "limitedOrUnlimitedContract": "LIMITED",
                        "desiredStartDate": "2021-02-22T07:00:00.000Z",
                        "phoneNumber": "12345678",
                        "salutation": "mr",
                        "netMonthlyIncome": 5200000,
                        "firstName": "Taimur",
                        "email": "taimur888@gmail.com",
                        "hadRentIssues": {
                            "checked": false
                        },
                        "truthfulnessConfirmation": {
                            "type": "CONFIRMATION_TEXT",
                            "checked": true,
                            "text": "Die/Der Mietinteressent(en) versicher(t)(n ) hiermit fÃ¼r sich und fÃ¼r den/die vorgesehenen Mitbenutzer ausdrÃ¼cklich und rechtsverbindlich, dass die vorstehenden Angaben vollstÃ¤ndig sind und der Wahrheit entsprechen. SÃ¤mtliche Angaben in dieser Selbstauskunft dienen der Beurteilung des/der Mietinteressenten und sind vor allem Grundlage der Entscheidung Ã¼ber den Mietvertragsabschluss. Dem/den Mietinteressenten ist daher bewusst, dass unrichtige oder unvollstÃ¤ndige Angaben im Rahmen dieser Selbstauskunft den Vermieter berechtigen, die Wirksamkeit eines abgeschlossenen Mietvertrages anzufechten, die Ãbergabe der Wohnung zu verweigern oder die sofortige Herausgabe der Wohnung nach bereits erfolgter Ãbergabe zu verlangen.",
                            "acceptedOn": "2021-02-21T10:02:02.576Z"
                        },
                        "otherIncomeSources": "nothing",
                        "householdPersons": {
                            "count": 1,
                            "values": []
                        }
                    }
                }
            ],
            "uploadsRootId": "e258572e-0cae-4519-81ac-d4acb606e0b8"
        },
          headers: token
            
        })
          })

      })
    
      const next = "button[type='submit']";
      const clickNoOfaAdults = "#mui-component-select-noOfAdultsMovingIn"

      const clickChildrenInHouseHold = "#mui-component-select-noOfChildrenMovingIn"
     
      const firstName = "[aria-describedby='applications[0].applicationFormData.firstName']";
      const lastName = "[aria-describedby='applications[0].applicationFormData.lastName']";
      const firstName2 = "[aria-describedby='applications[1].applicationFormData.firstName']"
      const lastName2 = "[aria-describedby='applications[1].applicationFormData.lastName']"
      const ok = ":nth-child(3) > .MuiButton-label";

      const rentalPeriod = "#desiredStartDate"
      const feedback = "[aria-labelledby=' mui-component-select-applications[0].applicationFormData.feedbackQuestion.selectedValue']"
      const selectFriend = '[data-value="FRIENDS"] '
      
      //Basic Information
      const basicInfo = '[aria-labelledby=" mui-component-select-applications[0].applicationFormData.salutation"]'
      const selectMr = "[data-value='mr']"
      const clickBasicDOB = "#birthDate"
      const selectBasicDOB = ':nth-child(97)'
      const clickFamilyStatus = '[aria-describedby="applications[0].applicationFormData.familyStatus"]'
      const selectFamilyStatus = '[data-value="married"]'
      const phoneNumber = "#phoneNumber"
      const basiEmail = "#email"

      //Current Address
      const street = "#street"
      const number = "#number"
      const zipCode = "#zipCode"
      const tenanSince = "#tenantSince"
      const clickReasonForMoving = "[aria-labelledby=' mui-component-select-applications[0].applicationFormData.reasonForMoving.selectedValue']"
      const selectReasonOfMoving = "[data-value='NEW_JOB']"
      //Current Employer
      const clickEmpolymentType = "[aria-labelledby=' mui-component-select-applications[0].applicationFormData.employmentType.selectedValue']"
      const selectEmplymentType = "[data-value='SELF_EMPLOYED']"
      const occupation = "#occupation"
      const clickMonthlyIncome = "[aria-labelledby=' mui-component-select-applications[0].applicationFormData.netMonthlyIncomeRanges']"
      const selectRangeOfMonthlyIncome = '.MuiList-root > :nth-child(6) > :nth-child(1)'
      const netIncome = "#netMonthlyIncome"
      const EmployerName = "#employerName"
      const clickContractType = "[aria-labelledby=' mui-component-select-applications[0].applicationFormData.limitedOrUnlimitedContract']"
      const selectContract = "[data-value='UNLIMITED']"
      const otherIncomeSource = "#otherIncomeSources"
      const employmentPeriod = "#employmentPeriod"

      //Is your net income sufficient to pay the rent also after deducting current liabilities (maintenance obligations, credit, car insurance, etc.)?
      const inIncomeEnough = '[aria-describedby="applications[0].applicationFormData.isIncomeEnough.checked"] > div'
      const incomeNotEnoughReason = '[name="applications[0].applicationFormData.isIncomeEnough.answer"]'

      //Household information
      const noTotalPeopleMovingIn = "#noTotalPeopleMovingIn"
      const houseHoldPerson = "[aria-labelledby=' mui-component-select-applications[0].applicationFormData.householdPersons.count']"
      
      const IsAnyOneSmoking = '[aria-describedby="applications[0].applicationFormData.isAnyoneSmoking"] > div'
      const DoYouHavePets = '[aria-describedby="applications[0].applicationFormData.hasPets.checked"] > div'
      const involvedInForecloserOrForeClose = '[aria-describedby="applications[0].applicationFormData.hadForeclosure.checked"]'
      const apartmentUse = '[aria-describedby="applications[0].applicationFormData.howWillApartmentBeUsed"]'
      
      const bankcruptcyOrCoOwner = '[aria-describedby="applications[0].applicationFormData.taghasFiledBankruptcyAndNegativeSchufaEntries.checked"]'
      const outOfCourt = '[aria-describedby="applications[0].applicationFormData.tagSettlementOfDebts"]'
      const uploadFile = "[aria-describedby='applications[0].applicationFormData.copyOfEmploymentContract']"
  }

export default Acme_Demo_Form;
