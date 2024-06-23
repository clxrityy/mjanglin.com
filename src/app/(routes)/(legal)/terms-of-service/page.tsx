import Link from "next/link";

export default function Page() {
    return (
        <div className="w-full h-full my-10 max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl flex flex-col mx-auto scrollbar-hide">
            <div className="flex flex-col items-start gap-5 pb-20">
                <div className="w-full h-full flex items-center flex-col gap-4">
                    <h1 className="text-4xl">Terms of Service</h1>
                    <blockquote className="bg-zinc-600/40 px-2 py-2 border-l-4 border-zinc-600 rounded-md text-sm">
                        Last updated <b>June 22, 2024</b>
                    </blockquote>
                </div>
                <div className="flex flex-col items-center gap-4 mx-auto">
                    <h3 className="heading" id="introduction">
                        Introduction
                    </h3>
                    <p className="paragraph">
                        Welcome to the Terms of Service for hbd, a Discord bot developed by <Link href="https://mjanglin.com" className="link font-semibold">MJ Anglin</Link> (<Link href="https://github.com/clxrityy" className="link">@clxrityy</Link>). These terms govern your use of hbd, its associated services, and interactions with it through <Link href="https://discord.com/" className="link">
                            Discord</Link>. By utilizing hbd, you agree to adhere to the guidelines and regulations outlined in this document.
                    </p>
                    <p className="paragraph">
                        hbd is designed to keep track of user's birthdays, and allow you to customize and/or set up how you'd like the bot to interact with users/birthdays. Before utilizing hbd, it is important to review and understand these Terms of Service to ensure a positive experience for all users.
                    </p>
                    <p className="paragraph">
                        Please note that by using hbd, you are bound to these terms and any subsequent updates or modifications made to them. If you do not agree with any part of these terms, refrain from using hbd and its services.
                    </p>
                    <p className="paragraph">
                        For further details regarding hbd, including its source code, functionalities, and usage guidelines, please refer to the <Link href="https://github.com/clxrityy/hbd" className="link">
                            GitHub repository
                        </Link>.
                    </p>
                    <p className="paragraph">
                        Thank you for choosing hbd. We hope you enjoy your experience with our Discord bot!
                    </p>
                    <h3 className="heading" id="acceptance-of-terms">
                        Acceptance of Terms
                    </h3>
                    <p className="paragraph">
                        By accessing or using hbd and its associated services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you are using hbd on behalf of an organization or entity, you represent and warrant that you have the authority to bind such organization or entity to these terms, and in such case, "you" and "your" will refer to that organization or entity.
                    </p>
                    <p className="paragraph">
                        If you do not agree with any part of these terms or do not have the legal authority to accept them, you are not permitted to use hbd and must refrain from accessing or using its services.</p>
                    <p className="paragraph">
                        Your use of hbd signifies your acceptance of these terms, including any future modifications or updates. It is your responsibility to review these terms periodically for any changes. Continued use of hbd after any modifications indicates your acceptance of the revised terms.
                    </p>
                    <h3 className="heading" id="description-of-service">
                        Description of Service
                    </h3>
                    <p className="paragraph">
                        hbd offers a comprehensive suite of features designed to enhance the Discord experience for users and guild administrators alike. Key functionalities include:
                    </p>
                    <ol className="flex flex-col gap-3 items-start">
                        <li className="orderedListItem">
                            <h4 className="orderedListItemHeading">
                                1. Birthday Management
                            </h4>
                            <p className="paragraph">
                                hbd facilitates the sealess management of user birthdays within Discord guilds. It securely stores user birthdays alongside their respective guild affilliations, ensuring accurate and timely recognition of special occasions.
                            </p>
                        </li>
                        <li className="orderedListItem">
                            <h4 className="orderedListItemHeading">
                                2. Guild Configuration Management
                            </h4>
                            <p className="paragraph">
                                Empowering guild administrators, hbd allows for the customization of guild settings to suit specific preferences and requirements. Administrators can effortlessly modify and manage various configurations to optimize the guild's Discord enviroment.
                            </p>
                        </li>
                        <li className="orderedListItem">
                            <h4 className="orderedListItemHeading">
                                3. Birthday Celebrations
                            </h4>
                            <p className="paragraph">
                                Celebrating special milestones, hbd orchestrates personalized birthday wishes for users on their designated birthdays. This thoughtful feature enhances community engagement and fosters camaraderie within Discord guilds.
                            </p>
                        </li>
                        <li className="orderedListItem">
                            <h4 className="orderedListItemHeading">
                                4. Daily Horoscope
                            </h4>
                            <p className="paragraph">
                                Elevating user engagement, hbd offers a daily horoscope feature tailored to each user's birthday and the current date. This personalized service provides insightful astrological predictions, enriching user interactions within Discord guilds.
                            </p>
                        </li>
                        <p className="paragraph">
                            By delivering these innovative services, hbd strives to enrich the Discord experience, foster community engagement, and create memorable moments for users and guild administrators alike.
                        </p>
                    </ol>
                    <h3 className="heading" id="user-conduct">
                        User Conduct
                    </h3>
                    <p className="paragraph">
                        As a user of hbd, you are expected to conduct yourself in a respectful and responsible manner. Your interactions with hbd, other users, and guild administrators should align with the following guidelines:
                    </p>
                    <ol className="flex flex-col gap-3 items-start">
                        <li className="orderedListItem">
                            <h4 className="orderedListItemHeading">
                                1. Responsible Use
                            </h4>
                            <p className="paragraph">
                                Users must referain from abusing hbd or engaging in any behavior that may disrupt its functionality or compromise the Discord experience for others.
                            </p>
                        </li>
                        <li className="orderedListItem">
                            <h4 className="orderedListItemHeading">
                                2. Bug Avoidance
                            </h4>
                            <p className="paragraph">
                                Intentional exploitation of bugs or vulnerabilities within hbd is strictly prohibited. Users should report any discovered bugs promptly to ensure the integrity and stability of the bot. Issues found with the bot can be reported <Link href="https://github.com/clxrityy/mjanglin.com/issues/new" className="link">
                                    here</Link>. Users who create <Link href="https://github.com/clxrityy/mjanglin.com/pulls" className="link">pull requests
                                </Link> with sufficient fixes will automatically become a contributor.
                            </p>
                        </li>
                    </ol>
                    <h3 className="heading" id="privacy-policy">
                        Privacy Policy
                    </h3>
                    <p className="paragraph">
                        hbd is committed to protecting the privacy and security of its users. This privacy policy outlines the information collected by hbd, how it is used, and the measures taken to safeguard it.
                    </p>
                    <ul className="flex flex-col gap-3 items-start">
                        <li className="unorderedListItem">
                            <h4 className="unorderedListItemHeading">
                                Information Collected
                            </h4>
                            <ul className="unorderedListList">
                                <li>
                                    <b>Guild and User IDs</b> — hbd collects and stores Discord guild and user IDs to facilitate the management of birthdays, birthday wishes, and guild settings.
                                </li>
                                <li>
                                    <b>Birthdays and Birthday Wishes</b> — Users may voluntarily provide their birthdays to hbd for the purpose of receiving personalized birthday wishes. These birthdays, along with any associated wishes, are securely stored to enhance user engagement and community interaction.
                                </li>
                                <li>
                                    <b>Guild Settings</b> — hbd stores guild settings as configured by guild administrators to customize the bot's behavior within each Discord server. These settings are used to optimize the user experience and ensure seamless integration with the guild's environment.
                                </li>
                            </ul>
                        </li>
                        <li className="unorderedListItem">
                            <h4 className="unorderedListItemHeading">
                                Use of Information
                            </h4>
                            <ul className="unorderedListList">
                                <li>
                                    <b>Birthday Management</b> — Guild and user IDs, along with birthdays, are used to facilitate the recognition and celebration of user birthdays within Discord guilds.
                                </li>
                                <li>
                                    <b>Community Engagement</b> — Birthdays and birthday wishes are utilized to foster community engagement and enhance the discord experience for users.
                                </li>
                                <li>
                                    <b>Customization</b> — Guild settings are employed to customize hbd's behavior within each Discord server, ensuring a tailored experience for guild members.
                                </li>
                            </ul>
                        </li>
                        <li className="unorderedListItem">
                            <h4 className="unorderedListItemHeading">
                                Data Security
                            </h4>
                            <p className="paragraph">
                                hbd employs industry-standard security measures to protect user data from unauthorized access, disclosure, or alteration. By utilizing secure encryption protocols and robust data storage practices, hbd safeguards user information and ensures its confidentiality.
                            </p>
                        </li>
                        <li className="unorderedListItem">
                            <h4 className="unorderedListItemHeading">
                                Data Retention
                            </h4>
                            <p className="paragraph">
                                hbd retains user data only for as long as necessary to fulfill the purposes outlined in this privacy policy. Users have the right to request the deletion of their data at any time, subject to any legal obligations or legitimate business interests.
                            </p>
                        </li>
                        <li className="unorderedListItem">
                            <h4 className="unorderedListItemHeading">
                                Third-Party Disclosure
                            </h4>
                            <p className="paragraph">
                                hbd does not sell, trade, or otherwise transfer user information to third parties without explicit consent. User data is used solely for the purposes described in this privacy policy and is not shared with external entities for commercial gain.
                            </p>
                            <p className="paragraph">
                                By using hbd, users consent to the collection and use of their information as described in this privacy policy.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}