import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-7">
                            <div className="footer-widget">
                                <h6 className="mt-4 font-weight-bold">Ocourse</h6>
                                <p>lsf;lksd;fk;sdfk</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-5">
                            <div className="footer-widget">
                                <h6 className="mt-4 font-weight-bold">Quick links</h6>
                                <ul>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Blogs</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <div className="footer-widget">
                                <h6 className="mt-4 font-weight-bold">Account</h6>
                                <ul>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Orders Tracking</a></li>
                                    <li><a href="#">Checkout</a></li>
                                    <li><a href="#">Wishlist</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-8 col-sm-8">
                            <div className="footer-newslatter">
                                <h6 className="mt-4 font-weight-bold">NEWSLETTER</h6>
                                <form action="#">
                                    <div className="group-input">
                                        <input type="text" placeholder="Email" />
                                        <button type="submit" className="btn-subscribe"><i className="far fa-envelope" aria-hidden="true"></i></button>
                                    </div>
                                </form>
                                <div className="footer-contact">
                                    <a href="https://www.facebook.com/hoangcongkinh1108/" target="_blank" className="btn btn-circle btn-social ml-2"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" target="_blank" className="btn btn-circle btn-social ml-2"><i className="fab fa-vk"></i></a>
                                    <a href="#" target="_blank" className="btn btn-circle btn-social ml-2"><i className="fab fa-twitter"></i></a>
                                    <a href="#" target="_blank" className="btn btn-circle btn-social ml-2"><i className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <p>Copyright &copy; 2020 by <a href="https://www.facebook.com/xuancanh.pham.165/">Pauker</a> All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;