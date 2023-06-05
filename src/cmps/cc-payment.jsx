import React from 'react';
import { useEffect, useState } from "react"


export const CCPayment = () => {
    const [isCCPayMethode, setIsCCPayMethode] = useState(false)

    function onToggleCCPayMethode(value) {
        // setIsCCPayMethode(prevIsCCPayMethode => !prevIsCCPayMethode)
        setIsCCPayMethode(value)

    }

    return (
        <section className='cc-payment'>
            <div className='billing-info-wrapper'>
                <header>
                    <p>Billing information</p>
                </header>
                <section className='billing-content'>
                    <div>
                        <p>Your invoice will be isuued according to the details listed here</p>
                        <p>John John</p>
                        <p>Israel</p>
                    </div>
                    <button>Add details</button>
                </section>
            </div>

            <div className='payment-options'>
                <header>
                    <p>Payment options</p>
                </header>
                <div className='payment-options'>

                    <div className='payment-method-CC'>
                        <label className='payment-option-label'>
                            <input type="radio" name="myRadio" value="CCOptions" onChange={()=> onToggleCCPayMethode(true)} />
                            Credit &amp;  Debit Cards
                        </label>
                    </div>

                    {isCCPayMethode && <div className='payment-method-CC-form-wrapper'>

                        <form className='payment-form-details'>

                            <div className='CC-details'>
                                <label>
                                    Card number
                                    <input name="cardNumber" defaultValue="0000 0000 0000 0000" />
                                </label>
                            </div>

                            <div className='experation-details'>
                                <label>
                                    Expiration date
                                    <input name="myInput" defaultValue="MM/YY" />
                                </label>
                                <label>
                                    Security code: <input name="myInput" defaultValue="300" />
                                </label>
                            </div>

                            <div className='buyer-name'>
                                <label>
                                    First name
                                    <input name="myInput" defaultValue="John" />
                                </label>
                                <label>
                                    Last name
                                    <input name="myInput" defaultValue="John" />
                                </label>
                            </div>

                        </form>
                    </div>}

                    <div className='payment-method-paypal'>
                        <label className='payment-option-label'>
                            <input type="radio" name="myRadio" value="CCOptions" onChange={()=> onToggleCCPayMethode(false)} />
                            <svg width="73" height="20" viewBox="0 0 73 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.70598 0H3.06309C2.67689 0 2.34848 0.282581 2.28816 0.666648L0.00590303 15.2398C-0.0393954 15.5275 0.181781 15.7866 0.471368 15.7866H3.16524C3.55143 15.7866 3.87984 15.5042 3.94016 15.1195L4.55562 11.1887C4.61502 10.8039 4.94413 10.5214 5.32962 10.5214H7.11591C10.8329 10.5214 12.9781 8.70972 13.5386 5.11997C13.791 3.54925 13.5492 2.31535 12.8189 1.45108C12.0169 0.502081 10.5944 0 8.70598 0ZM9.35539 5.32323C9.04685 7.36251 7.49977 7.36251 6.004 7.36251H5.15234L5.74977 3.55396C5.78537 3.32375 5.9832 3.1543 6.21431 3.1543H6.60467C7.62365 3.1543 8.58486 3.1543 9.08152 3.73924C9.37781 4.08816 9.46841 4.60677 9.35539 5.32323Z" fill="#28356A" /><path fill-rule="evenodd" clip-rule="evenodd" d="M25.5737 5.25605H22.8715C22.6414 5.25605 22.4424 5.4255 22.407 5.65571L22.2873 6.41686L22.0985 6.14103C21.5135 5.28584 20.2089 5 18.907 5C15.9208 5 13.3704 7.27787 12.8738 10.4731C12.6156 12.0668 12.9826 13.591 13.8805 14.6538C14.704 15.631 15.8822 16.0383 17.2839 16.0383C19.69 16.0383 21.024 14.4802 21.024 14.4802L20.9036 15.2364C20.8583 15.5255 21.0795 15.7849 21.3675 15.7849H23.8013C24.1884 15.7849 24.5152 15.5023 24.5762 15.1175L26.0367 5.80282C26.0829 5.51605 25.8624 5.25605 25.5737 5.25605ZM21.8065 10.5531C21.5458 12.1077 20.3207 13.1514 18.7579 13.1514C17.9733 13.1514 17.3462 12.898 16.9434 12.4178C16.544 11.9408 16.3924 11.2618 16.5193 10.5056C16.7629 8.96418 18.0086 7.88623 19.5476 7.88623C20.3149 7.88623 20.9387 8.14321 21.3496 8.62736C21.7612 9.11688 21.9246 9.80005 21.8065 10.5531Z" fill="#28356A" /><path fill-rule="evenodd" clip-rule="evenodd" d="M39.965 5.25781H37.2494C36.9903 5.25781 36.747 5.38746 36.6002 5.6044L32.855 11.1603L31.2675 5.82111C31.1676 5.48709 30.8617 5.25781 30.515 5.25781H27.8468C27.5223 5.25781 27.2972 5.57694 27.4002 5.88442L30.3913 14.7245L27.5794 18.7225C27.3582 19.0375 27.581 19.4704 27.963 19.4704H30.6751C30.9326 19.4704 31.1734 19.344 31.3195 19.1315L40.351 6.00151C40.5673 5.6875 40.3452 5.25781 39.965 5.25781Z" fill="#28356A" /><path fill-rule="evenodd" clip-rule="evenodd" d="M48.9557 0H43.3122C42.9269 0 42.5985 0.282581 42.5382 0.666648L40.2559 15.2398C40.2106 15.5275 40.4318 15.7866 40.7198 15.7866H43.6158C43.8846 15.7866 44.1148 15.589 44.1569 15.3196L44.8047 11.1887C44.8641 10.8039 45.1934 10.5214 45.5787 10.5214H47.3643C51.082 10.5214 53.2265 8.70972 53.7877 5.11997C54.041 3.54925 53.7976 2.31535 53.0673 1.45108C52.266 0.502081 50.8444 0 48.9557 0ZM49.6084 5.32274C49.3005 7.36202 47.7534 7.36202 46.2568 7.36202H45.4063L46.0044 3.55347C46.0397 3.32326 46.2362 3.15381 46.468 3.15381H46.8583C47.8764 3.15381 48.8385 3.15381 49.3352 3.73875C49.6315 4.08767 49.7214 4.60628 49.6084 5.32274Z" fill="#298FC2" /><path fill-rule="evenodd" clip-rule="evenodd" d="M65.8201 5.25605H63.1195C62.8877 5.25605 62.6906 5.4255 62.6559 5.65571L62.5362 6.41686L62.3465 6.14103C61.7615 5.28584 60.4578 5 59.1557 5C56.1697 5 53.6203 7.27787 53.1236 10.4731C52.8661 12.0668 53.2315 13.591 54.1292 14.6538C54.9545 15.631 56.1309 16.0383 57.5328 16.0383C59.9387 16.0383 61.2729 14.4802 61.2729 14.4802L61.1525 15.2364C61.1072 15.5255 61.3282 15.7849 61.618 15.7849H64.0512C64.4364 15.7849 64.7648 15.5023 64.8252 15.1175L66.2863 5.80282C66.3309 5.51605 66.1097 5.25605 65.8201 5.25605ZM62.0534 10.5529C61.7943 12.1076 60.5674 13.1513 59.0046 13.1513C58.2215 13.1513 57.5929 12.8978 57.1901 12.4176C56.7909 11.9407 56.6407 11.2617 56.766 10.5054C57.0112 8.96406 58.2553 7.88611 59.7943 7.88611C60.5616 7.88611 61.1854 8.14308 61.5963 8.62724C62.0095 9.11675 62.1729 9.79993 62.0534 10.5529Z" fill="#298FC2" /><path fill-rule="evenodd" clip-rule="evenodd" d="M69.0055 0.400594L66.6895 15.2405C66.6442 15.5282 66.8651 15.7873 67.1531 15.7873H69.4816C69.8687 15.7873 70.1969 15.5049 70.2563 15.1202L72.5402 0.547704C72.5857 0.260002 72.3645 0 72.0766 0H69.4693C69.2392 0.000698305 69.0411 0.170386 69.0055 0.400594Z" fill="#298FC2" /></svg>
                        </label>
                    </div>
                </div>
            </div>



        </section>
    )
}