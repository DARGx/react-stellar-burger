export enum RequestStatus {
  INITIAL = 'initial',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const getRequestStatus = (status: RequestStatus) => ({
  isInitial: status === RequestStatus.INITIAL,
  isPending: status === RequestStatus.PENDING,
  isSuccess: status === RequestStatus.SUCCESS,
  isError: status === RequestStatus.ERROR,
})