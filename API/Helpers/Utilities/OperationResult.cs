namespace API.Helpers.Utilities
{
    public class OperationResult
    {
        public string Message { set; get; }
        public bool IsSuccess { set; get; }
        public object Data { set; get; }

        public OperationResult()
        {

        }

        public OperationResult(string mess)
        {
            this.Message = mess;
        }

        public OperationResult(bool isSuccess)
        {
            this.IsSuccess = isSuccess;
        }

        public OperationResult(bool isSuccess, string mess)
        {
            this.Message = mess;
            this.IsSuccess = isSuccess;
        }

        public OperationResult(bool isSuccess, object data)
        {
            this.IsSuccess = isSuccess;
            this.Data = data;
        }

        public OperationResult(bool isSuccess, string mess, object data)
        {
            this.Message = mess;
            this.IsSuccess = isSuccess;
            this.Data = data;
        }
    }
}