
const ApplauseButton = () => {

    function createCustomEvent() {
        const userInteractEvent = new CustomEvent('interact');
        document.dispatchEvent(userInteractEvent);
    }

    return (
        <div>
            <button className={'applause-button'} onClick={createCustomEvent}>
                Enable applause
            </button>

        </div>
    );
};

export default ApplauseButton;