import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import store from "../redux/store/store"
import axios from "axios";
import {ErrorToast} from "../helper/FormHelper";
import {SetAllProduct, SetTotal} from "../redux/state-slice/productSlice";

const BaseURL="http://localhost:5000/api/v1";

export const GetProductList =async(pageNo,perPage,searchKeyword)=>{
    let URL = BaseURL + "/ProductsList/"+pageNo+"/"+perPage+"/"+searchKeyword;
    store.dispatch(ShowLoader());

    try{
        const result = await axios.get(URL);
        store.dispatch(HideLoader());
        if (result.status===200 && result.data["status"]==="success"){
            if (result.data["data"][0]["Rows"].length>0){
                store.dispatch(SetAllProduct(result.data["data"][0]["Rows"]));
                store.dispatch(SetTotal(result.data["data"][0]["Total"][0]["count"]))
            }
            else{
                store.dispatch(SetAllProduct([]))
                store.dispatch(SetTotal(0));
                ErrorToast("No data found")
            }

            return  true;
        }

        else{
            ErrorToast("Something went wrong")
            return  false;
        }
    }

    catch(err){
        store.dispatch(HideLoader());
        ErrorToast("catch error");
        return false;
    }
}
