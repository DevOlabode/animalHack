# Model: MedicalDocument

**File:** `backend/models/MedicalDocument.js`

| Field | Type | Required |
|-------|------|----------|
| petId | ObjectId→Pet | yes |
| ownerId | ObjectId→User | yes |
| title | String | yes |
| documentType | String | vaccination\|lab\|blood\|xray\|referral\|other |
| fileType | String | pdf\|jpg\|png |
| fileUrl | String | yes |
| timestamps | | |
