import React from "react";
import Layout from '../components/Layout'

const Vaccines = () => {
    return(
        <Layout>
            <div>
                <h2>Vaccines</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Ex date</th>

                        </tr>
                    </thead>
                </table>
            </div>
        </Layout>
    )
}
export default Vaccines;


