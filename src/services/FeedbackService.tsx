import AxiosBase from './AxiosBase';

class FeedbackService extends AxiosBase {
    public async SendNewFeedback<T>(data: FeedbackDTO) {
        const url = 'Feedbacks/new';
        return this.request<T>({ method: 'post', url, data });
    }
}

export default FeedbackService;
