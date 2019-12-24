import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ========================================
class InsuranceApp extends React.Component {

    constructor(props) {
        super(props);
        //получить от сервера ContractViewList
        this.state = {
            isIndexControlPanelEnable: true,
            isContractViewListPageEnable: true,
            isSingleContractPageEnable: false,
            contractModel: {
                status: "NEW",
                calcInfo: {},
                holderInfo: {},
                realtyLocation: {}
            }
        }
    }

    handleClickCreateNewContractButton() {
        this.setState({
            isIndexControlPanelEnable: false,
            isContractViewListPageEnable: false,
            isSingleContractPageEnable: true
        });
    }

    handleClickOpenExistContractButton() {
        this.setState({
            isIndexControlPanelEnable: false,
            isContractViewListPageEnable: false,
            isSingleContractPageEnable: true
        });
    }

    handleClickSaveContractButton() {
        this.setState({
            isIndexControlPanelEnable: true,
            isContractViewListPageEnable: true,
            isSingleContractPageEnable: false
        });
    }

    handleClickReturnToContractViewListButton() {
        this.setState({
            isIndexControlPanelEnable: true,
            isContractViewListPageEnable: true,
            isSingleContractPageEnable: false
        });
    }

    render() {
        return (
            <div className="insurance-app">
                {this.state.isIndexControlPanelEnable ?
                    <CreateNewContractButton onClick={() => this.handleClickCreateNewContractButton()}/>
                    : null}
                {this.state.isIndexControlPanelEnable ?
                    <OpenExistContractButton onClick={() => this.handleClickOpenExistContractButton()}/>
                    : null}
                {this.state.isContractViewListPageEnable ?
                    <div className="contract-view-list-page">
                        <ContractViewListPage />
                    </div>  : null}
                {this.state.isSingleContractPageEnable ?
                    <div className="single-contract-page">
                        <SingleContractPage
                            onClickSaveContractButton = {() => this.handleClickSaveContractButton()}
                            onClickReturnToContractViewListButton = {() => this.handleClickReturnToContractViewListButton()}
                        />
                    </div>  : null}
            </div>
        );
    }
}

class CreateNewContractButton extends React.Component {
    render() {
        return (
            <button className="create-new-contract-button"
                    onClick={() => this.props.onClick()}>
                Создать договор
            </button>
        );
    }
}

class OpenExistContractButton extends React.Component {
    render() {
        return (
            <button className="open-exist-contract-button"
                    onClick={() => this.props.onClick()}>
                Открыть договор
            </button>
        );
    }
}

class SaveContractButton extends React.Component {
    render() {
        return (
            <button className="save-contract-button"
                    onClick={() => this.props.onClick()}>
                Сохранить
            </button>
        );
    }
}

class ReturnToContractViewListButton extends React.Component {
    render() {
        return (
            <button className="return-to-contract-view-list-button"
                    onClick={() => this.props.onClick()}>
                К списку договоров
            </button>
        );
    }
}
class ContractViewListPage extends React.Component {
    render() {
        return (
            <div className="contract-view-list-page">
                ContractViewListPage
            </div>
        );
    }
}

class CalcForm extends React.Component {
    handleUserInput(e) {
        let fieldName = e.target.name;
        let value = e.target.value;
        validateField(fieldName, value);
    }
    render() {
        return (
            <fieldset className="tFormContainer">
                <legend>Расчет</legend>
                <form id="calcForm">
                    <div>
                        <label htmlFor="insuranceAmount">Страховая сумма</label>
                        <input type="number" name="insuranceAmount" id="insuranceAmount"
                        onChange={this.handleUserInput}/>
                    </div>
                    <div>
                        <label htmlFor="insuranceStartDate">Срок действия с</label>
                        <input type="date" name="insuranceStartDate" id="insuranceStartDate"/>
                    </div>
                    <div>
                        <label htmlFor="insuranceEndDate"> по </label>
                        <input type="date" name="insuranceEndDate" id="insuranceEndDate"/>
                    </div>
                    <div>
                        <label htmlFor="realtyType">Тип недвижимости</label>
                        <input list="realtyTypeList" name="realtyType" id="realtyType" />
                            <datalist id="realtyTypeList">
                                <option value="квартира" title="apartment"/>
                                <option value="дом" title="house"/>
                                <option value="комната" title="room"/>
                            </datalist>
                    </div>
                    <div>
                        <label htmlFor="realtyBuildYear">Год постройки</label>
                        <input type="text" name="realtyBuildYear" id="realtyBuildYear"/>
                    </div>
                    <div>
                        <label htmlFor="realtyArea">Площадь, кв.м.</label>
                        <input type="text" name="realtyArea" id="realtyArea" />
                    </div>
                    <div><input type="submit" value="Рассчитать"/></div>
                    <div>
                        <label htmlFor="insuranceCalcDate">Дата расчета</label>
                        <input type="date" name="insuranceCalcDate" id="insuranceCalcDate" readOnly />
                    </div>
                    <div>
                        <label htmlFor="insurancePremium">Премия</label>
                        <input type="text" name="insurancePremium" id="insurancePremium" />
                    </div>
                </form>
            </fieldset>
        );
    }
}

class ContractForm extends React.Component {
    render() {
        return(
            <div className="single-contract-page">
                <label htmlFor="contractId">№ договора</label>
                <input type = "text" id = "contractId" name = "contractId" />
                <label htmlFor="contractDate" required>Дата заключения</label>
                <input type="date" id="contractDate" name="contractDate" readOnly />
            </div>
        );
    }
}

class ClientForm extends React.Component {
    render() {
        return(
            <div className="client-form">
                <div>
                    <b>СТРАХОВАТЕЛЬ</b>
                </div>
                <div>
                    <button id="openSearchHolderDialog">Выбрать</button>
                    <label htmlFor="holderFullName"> ФИО </label>
                    <input type="text" id="holderFullName" name="fullName"/>
                    <button>Изменить</button>
                </div>
                <div>
                    <label htmlFor="holderBirthDate">Дата рождения</label>
                    <input type="date" id="holderBirthDate" name="birthDate"/>
                    <label htmlFor="holderPassportSeries"> Паспорт серия </label>
                    <input type="text" id="holderPassportSeries" name="passportSeries"/>
                    <label htmlFor="holderPassportNumber"> номер </label>
                    <input type="text" name="passportNumber" id="holderPassportNumber"/>
                </div>
            </div>
        );
    }
}

class RealtyLocationForm extends React.Component {
    render() {
        return(
            <div className="realty-location-form">
                <div><b>Адрес недвижимости</b></div>
                <div>
                    <div className="block-element">
                        <div className="inline-block-element">
                            <input list="countryList" name="country" id="country" className="block-element"/>
                            <datalist id="countryList">
                                <option value="Россия" />
                                <option value="другое" />
                            </datalist>
                            <label htmlFor="country" className="block-element">государство</label>
                        </div>
                        <div className="inline-block-element">
                            <input type="text" id="postIndex" name="postIndex" className="block-element" />
                            <label htmlFor="postIndex" className="block-element">индекс</label>
                        </div>
                        <div className="inline-block-element">
                            <input type="text" id="federalRegion" name="federalRegion" className="block-element" />
                            <label htmlFor="federalRegion" className="block-element">республика, край, область</label>
                        </div>
                        <div className="inline-block-element">
                            <input type="text" id="district" name="district" className="block-element" />
                            <label htmlFor="district" className="block-element">район</label>
                        </div>
                    </div>
                    <div className="block-element">
                        <div className="inline-block-element">
                            <input type="text" id="place" name="place" className="block-element" />
                            <label htmlFor="place" className="block-element">населенный пункт</label>
                        </div>
                        <div className="inline-block-element">
                            <input type="text" id="street" name="street" className="block-element" />
                            <label htmlFor="street" className="block-element">улица</label>
                        </div>
                        <div className="inline-block-element">
                            <input type="text" id="houseNumber" name="houseNumber" className="block-element" />
                            <label htmlFor="houseNumber" className="block-element">дом</label>
                        </div>
                        <div className="inline-block-element">
                            <input type="text" id="houseBlock" name="houseBlock" className="block-element" />
                            <label htmlFor="houseBlock" className="block-element">корпус</label>
                        </div>
                        <div className="inline-block-element">
                            <input type="text" id="building" name="building" className="block-element" />
                            <label htmlFor="building" className="block-element">строение</label>
                        </div>
                        <div className="inline-block-element">
                            <input type="text" id="apartment" name="apartment" className="block-element" />
                            <label htmlFor="apartment" className="block-element">квартира</label>
                        </div>
                    </div>
                    <div className="block-element">
                        <div>КОММЕНТАРИЙ</div>
                        <div>
                            <div className="inline-block-element">комментарий к<br/> договору (не<br/> печатается на<br/> полисе)</div>
                            <div className="inline-block-element"><textarea name="text" className="contractCommentArea" id="comment" name="comment"></textarea></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class SingleContractPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="single-contract-page">
                <div>
                    <CalcForm />
                    <ContractForm />
                    <ClientForm />
                    <RealtyLocationForm />
                    <SaveContractButton onClick={() => this.props.onClickSaveContractButton()}/>
                    <ReturnToContractViewListButton onClick={() => this.props.onClickReturnToContractViewListButton()}/>
                </div>
            </div>
        );
    }
}
// ========================================
function validateField(fieldName, value) {
    alert("Вы вызвали валидацию для fieldname = " + fieldName + ", value = " + value);
    /*
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;*/
    /*
    switch(fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
        default:
            break;
    }
    this.setState({formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
    }, this.validateForm);*/
}


ReactDOM.render(
<InsuranceApp />,
    document.getElementById('root')
);
