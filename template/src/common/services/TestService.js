import ApiManager from '@/common/managers/ApiManager'

export default {
    testAxios() {
        return ApiManager.post("/abc", { name: 1})
    }
}