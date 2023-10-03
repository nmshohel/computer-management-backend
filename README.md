PBS:<br>
https://computer-management-system.onrender.com/api/v1/pbs/create-pbs<br>
https://computer-management-system.onrender.com/api/v1/pbs/35<br>

zonal:<br>
https://computer-management-system.onrender.com/api/v1/zonal/create-zonal<br>
https://computer-management-system.onrender.com/api/v1/zonal/35<br>
https://computer-management-system.onrender.com/api/v1/zonal/zonal/3501<br>

complain:<br>
https://computer-management-system.onrender.com/api/v1/complain/create-complain<br>
https://computer-management-system.onrender.com/api/v1/complain/35<br>
https://computer-management-system.onrender.com/api/v1/complain/complain/350101<br>

substation:<br>
https://computer-management-system.onrender.com/api/v1/substation/create-substation<br>
https://computer-management-system.onrender.com/api/v1/substation/35<br>
https://computer-management-system.onrender.com/api/v1/substation/substation/3501<br>

User:<br>
https://computer-management-system.onrender.com/api/v1/user/create-user<br>
https://computer-management-system.onrender.com/api/v1/user/35<br>
https://computer-management-system.onrender.com/api/v1/user/user/01793047162<br>

Employee:<br>
https://computer-management-system.onrender.com/api/v1/employee/create-employee<br>
https://computer-management-system.onrender.com/api/v1/employee/<br>

Brand:<br>
https://computer-management-system.onrender.com/api/v1/brand/create-brand<br>
https://computer-management-system.onrender.com/api/v1/brand/<br>

Model:<br>
https://computer-management-system.onrender.com/api/v1/model/create-model<br>
https://computer-management-system.onrender.com/api/v1/model/<br>

ItemType:<br>
https://computer-management-system.onrender.com/api/v1/item-type/create-item-type<br>
https://computer-management-system.onrender.com/api/v1/item-type/<br>

Category:<br>
https://computer-management-system.onrender.com/api/v1/category/create-category<br>
https://computer-management-system.onrender.com/api/v1/category/<br>

Sub-Category:<br>
https://computer-management-system.onrender.com/api/v1/sub-category/create-sub-category<br>
https://computer-management-system.onrender.com/api/v1/sub-category/<br>

Supplier:<br>
https://computer-management-system.onrender.com/api/v1/supplier/create-supplier<br>
https://computer-management-system.onrender.com/api/v1/supplier/35<br>
https://computer-management-system.onrender.com/supplier/supplier/0b741143-139d-4bac-be37-db80b6a6e204<br>

Capital-Item:<br>
https://computer-management-system.onrender.com/api/v1/capital-item/create-capital-item<br>
https://computer-management-system.onrender.com/api/v1/capital-item/35<br>
http://localhost:5000/api/v1/capital-item/capital/aca0e1bf-d0eb-4f9a-88a4-9b3de65ed6bd<br>

Revenue-Item:<br>
POST: https://computer-management-system.onrender.com/api/v1/revenue-item/create-revenue-item<br>
Req.body:<br>

```json
{
{
    "description": "A sample capital item description.",
    "purchasedate": "2023-08-24",
    "price": "500",
    "warranty": "1 year",
    "addByMobileNo": "01793047162",
    "supplierId": "9a479a25-f927-48cf-aaa8-ae01234d5af9",
    "categoryId": "4de4a319-c373-45b9-b886-0ae707d26613",
    "subCategoryid": "4505f171-7aa7-458b-a122-b9952732f9e1",
    "itemTypeId": "41affc50-847d-453d-a090-55baddfe4251"
}
}
```

<br>
GET: https://computer-management-system.onrender.com/api/v1/revenue-item/35<br>
GET: http://localhost:5000/api/v1/revenue-item/revenue/d1d9eee8-5b1b-4b04-9240-bab3e0923aed<br>

3.  Assign: http://localhost:5000/api/v1/revenue-item/assign-revenue-item/bb8bdc4f-84d0-4034-88c9-807ec71bca5b (POST) <br>
    Req.body:<br>

```json
{
  "identificationNo": "35.01.MNT.08",
  "assignToMobileNo": "01793047162"
}
```

<br>
04. Get all for Reveived: http://localhost:5000/api/v1/revenue-item/assignToAndReveivePending (GET)<br>
05. Received: http://localhost:5000/api/v1/revenue-item/receive-revenue-item/bb8bdc4f-84d0-4034-88c9-807ec71bca5b (POST)<br>
06. Get all Received By: http://localhost:5000/api/v1/revenue-item/reveived-by (GET)<br>

Department:<br>
https://computer-management-system.onrender.com/api/v1/department/create-department<br>
https://computer-management-system.onrender.com/api/v1/department/<br>

Designation:<br>
https://computer-management-system.onrender.com/api/v1/designation/designation<br>
https://computer-management-system.onrender.com/api/v1/designation/<br>

<hr>
------------------------- # 12/09/2023 ------------------<br>
- # User:<br>
http://localhost:5000/api/v1/user/pbs-posting-request (POST)<br>
Request body:

```json
{
  "mobileNo": "01793047162"
}
```

http://localhost:5000/api/v1/user/pbs-all-transfer-requested-user/35 (GET)<br>
http://localhost:5000/api/v1/user/pbs-posting-request-approve/:mobileNo (POST)<br>

http://localhost:5000/api/v1/user/pbs-posting-request-cancel/:mobileNo (POST)<br><br><br>
http://localhost:5000/api/v1/user/zonal-posting-request (POST)<br>
Request body:

```json
{
  "mobileNo": "01793047162",
  "zonalCode": "3502"
}
```

http://localhost:5000/api/v1/user/zonal-all-transfer-requested-user/35 (GET)<br>
http://localhost:5000/api/v1/user/zonal-posting-request-approve/:mobileNo (POST)<br>

http://localhost:5000/api/v1/user/zonal-posting-request-cancel/:mobileNo (POST)<br>

<br>
<br>
- # Employee:<br>
  http://localhost:5000/api/v1/employee/01845645545656 (Patch)<br>

```json
{
  "designation": "Software Engineer",
  "phone": "123-456-7890",
  "address": "123 Main St, City",
  "trgId": "EMP001",
  "photoUrl": "https://example.com/johndoe.jpg",
  "signUrl": "https://example.com/johndoe-sign.jpg"
}
```

http://localhost:5000/api/v1/employee/01845645545656 (GET)<br>
