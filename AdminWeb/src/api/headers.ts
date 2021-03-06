import chest from "./chest";

export default function headers(authorization = false, contentType: string = null){
    let properties = {
        "Content-Type": "application/json",
    };
    if (contentType != null){
        properties["Content-Type"] = contentType;
    }
    if (contentType === "multipart/form-data"){
        delete properties["Content-Type"];
    }
    if (authorization){
        return {
            ... properties,
            Authorization: "Bearer " + chest.get("token")
        };
    } else {
        return {
            ... properties
        };
    }
}