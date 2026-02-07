import { ApiClient } from "./apiClient";
import { APIRequestContext } from "playwright";
import { BookActions } from "../actions/book";
import { AccountActions } from "../actions/account";

export class Container {
    account:AccountActions;
    book:BookActions;
    constructor(request:APIRequestContext){
        const apiClient = new ApiClient(request);
        this.account = new AccountActions(apiClient);
        this.book = new BookActions(apiClient);
    }
}