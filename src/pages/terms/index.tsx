/* eslint-disable react/no-unescaped-entities */
import { Trans, t } from '@lingui/macro';
import cs from 'classnames';
import { useEffect } from 'react';

import { Text } from 'shared/ui';

import styles from './terms.module.scss';

interface TermsProps {
  title?: string;
  classNames?: string;
}

export const Terms = ({ title, classNames }: TermsProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <div className={cs('w-[820px]', classNames)}>
      <Text family="pt-bold" type="s32px-h36px" color="primary" text={t`TERMS OF USE`} />
      <div className="mt-7">
        <Text family="inter-regular" type="s16px-h18px" color="grey" text={t`Watermarked Terms of Use`} />
        <Text family="inter-regular" type="s16px-h18px" color="grey" text={t`updated: January 08, 2024`} />
      </div>
      <div className="mt-2">
        <div className={styles.text_block}>
          <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`1. INTRODUCTION`} className="mb-[8px]" />
          <div>
            <Trans>
              These Terms of Use (the “Terms”) govern your relationship with https://watermarked.io (referred to as the
              "Service", “Website", or "Watermarked”) operated by Watermarked Technologies Limited (registration number:
              01010119) (“us”, “we”, or “our”). The term “Service” includes our web service along with our applications,
              irrespective of the platform. By using the Service and the Website or Application, you (“you”, the “user”)
              agree to comply with and be bound by these Terms. Please review the terms carefully. If you do not agree
              to these Terms, you should cease using our Service and close the Website.
            </Trans>
          </div>
          <div>
            <Trans>
              Your access to and use of the Service and the Website is contingent upon your acceptance of and compliance
              with these Terms. These Terms apply to all visitors, users, and other persons or entities who access our
              resources.
            </Trans>
          </div>
          <div>
            <Trans>
              We reserve the right, at our sole discretion, to change, modify, add or remove portions of these Terms at
              any time.
            </Trans>
          </div>
          <div>
            <Trans>
              If we make any changes, we will notify you by updating the date at the top of the Terms and maintaining a
              current version on our Website. Changes become effective on the day they are posted.
            </Trans>
          </div>
          <div>
            <Trans>
              It is your responsibility to check these Terms periodically for changes. Your continued use of our
              resources following the posting of changes signifies your acceptance and agreement to the changes. As long
              as you comply with these Terms, we grant you a personal, non-exclusive, non-transferable, limited
              privilege to enter the Website and use the Service.
            </Trans>
          </div>
          <div>
            <Trans>
              If you disagree with any changes, you can stop all operations within the Website or Application, terminate
              any subscription, and stop using the Service. If you continue to use our Website or Application after
              notification of changes, it means that you agree to the updated Terms.
            </Trans>
          </div>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`2. USE OF THE WEBSITE/APPLICATION `}
          className="mb-[8px]"
        />
        <div>
          <div>
            <Trans>
              Our digital cryptographic watermark (“Watermark”) is a technique we use to embed invisible and inaudible
              information within your digital content, such as images, audio, or video files (the “Content”). The
              Watermark serves as a unique identifier and cryptographic code that can be traced back to the user.
            </Trans>
          </div>
          <div>
            <Trans>
              Artificial intelligence and neural networks within our Service process the Content and subsequently assign
              it a Watermark. Information about the embedded Watermarks in the processed Content is stored on the
              blockchain. After the Content has been processed by the Service, an NFT (non-fungible token) is minted and
              transferred to the user. This NFT confirms the embedded Watermark in the User’s Content.
            </Trans>
          </div>
          <div>
            <Trans>
              Our Watermark is designed to be robust and resistant to tampering, alteration, or removal. It can survive
              various content processing methods, such as compression, cropping, and mirroring. This means that even if
              the Content is severely modified or compressed, the Watermark remains intact in the majority of cases,
              ensuring continued protection.
            </Trans>
          </div>
          <div>
            <Trans>
              The primary goal of using our Service is to deter unauthorized copying, distribution, or use of user's
              Content by facilitating its tracking.
            </Trans>
          </div>
          <div>
            <Trans>Our Watermark can help protect intellectual property rights in several ways:</Trans>
          </div>
          <div>
            <Trans>
              1. Proof of ownership: The Watermark serves as a digital signature, confirming the identity of the Content
              creator or owner if such information is provided by the user. If unauthorized use or distribution occurs,
              the Watermark can help the user to establish the origin of the Content and support claims of copyright
              infringement.
            </Trans>
          </div>
          <div>
            <Trans>
              2. Tracking and monitoring: The Watermark can be used to monitor Content usage across various platforms,
              enabling Content owners to identify unauthorized sharing or reproduction. By tracing the unique Watermark,
              you can pinpoint the sources of infringement and take appropriate actions.
            </Trans>
          </div>
          <div>
            <Trans>
              3. Deterrent/Preventive utility: The presence of the Watermark can deter potential infringers, as they
              become aware that the Content can be traced back to them, thereby making it easier for the owner to pursue
              legal actions.
            </Trans>
          </div>
          <div>
            <Trans>
              Our Watermark provides an additional layer of security for digital Content creators and owners, enabling
              them to better protect their intellectual property rights in this era of rapid digital distribution and
              sharing.
            </Trans>
          </div>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`3. INTELLECTUAL PROPERTY RIGHTS AND TRADEMARK INFORMATION`}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            Our resources, such as all the content of the Website, Application, Service, all our software, and graphic
            materials, as well as all names, marks, brands, logos, designs, trade dress, and other designations, are
            protected by copyright, trademark, patent, and/or other intellectual property laws. Any unauthorized use of
            these materials is prohibited. You agree not to copy, republish, frame, download, transmit, modify, rent,
            lease, loan, sell, assign, distribute, license, sublicense, reverse engineer, or create derivative works
            based on the Website and Service, except as expressly authorized herein. Additionally, you agree not to use
            any data mining, robots, or similar data gathering and extraction methods in connection with the Website and
            Service.
          </Trans>
        </div>
        <div>
          <Trans>
            You are permitted to refer to products and services associated with us, provided that such references are
            truthful and not misleading.
          </Trans>
        </div>
        <div>
          <Trans>
            You may not remove or alter any data about the Watermarked Service, nor may you use the Service in any
            manner that is inconsistent with our ownership of such trademarks. You acknowledge our rights in these
            trademarks and agree that any and all use of these trademarks by you shall inure to our sole benefit. You
            agree not to incorporate any “Watermarked” trademarks into any other trademarks, service marks, company
            names, Internet addresses, domain names, or any other similar designations without our permission.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`4. PERSONAL INFORMATION AND PRIVACY`}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            The Watermarked Privacy Policy (the "Policy") applies to the use of this Website and Service, and its terms
            are made a part of these Terms of Use by this reference. To view our Policy
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`5. REGISTRATION, ACCOUNT AND NOTICES`}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            To access our Service, you must complete a registration form on our Website and Application. By registering,
            you agree to:
          </Trans>
        </div>
        <div>
          <Trans>
            - Provide true, accurate, current and complete information on the registration and KYC forms (the
            "Registration Data");
          </Trans>
        </div>
        <div>
          <Trans>
            - Maintain and promptly update the Registration Data to keep it true, accurate, current, and complete.
          </Trans>
        </div>
        <div>
          <Trans>
            Upon completing the Website/Application registration process, you will receive login credentials. You are
            responsible for maintaining the confidentiality of your login credentials and for all activities under your
            account. We cannot be held liable for any loss or damage arising from your failure to comply with these
            rules of registration. You are also responsible for all uses of your account, whether or not actually or
            expressly authorized by you. Do not disclose your password to any third party. Notify us immediately upon
            becoming aware of any breach of security or unauthorized use of your account.
          </Trans>
        </div>
        <div>
          <Trans>
            We reserve the right to suspend or terminate your account if we have grounds to suspect that your
            information is untrue, inaccurate, outdated, or incomplete. We also have the right to deny membership to any
            applicant at our discretion. We may report violations to competent authorities if we suspect you have
            provided deliberately false data.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`6. RESTRICTIONS`} className="mb-[8px]" />
        <div>
          <Trans>When using the Service and Website, you are prohibited to:</Trans>
        </div>

        <div>
          <Trans>
            • assign or transfer any rights you have under these Terms to any other person (including by sharing your
            password with someone else) without our prior written consent;
          </Trans>
        </div>
        <div>
          <Trans>
            • take actions that might damage, disrupt or place an unreasonable burden on our Service or anyone else’s
            use of our Service, including but not limited to denial of service attacks or similar;
          </Trans>
        </div>
        <div>
          <Trans>
            • infringe anyone else’s intellectual property, copyright, including by uploading any third party content
            without the owner’s authorization;
          </Trans>
        </div>
        <div>
          <Trans>
            • store, use, download, upload, share, access, transmit, or otherwise make available, data in violation of
            any law in any country;
          </Trans>
        </div>
        <div>
          <Trans>
            • store, use, download, upload, share, access, transmit, or otherwise make available, unsuitable, offensive,
            obscene or discriminatory information of any kind;
          </Trans>
        </div>
        <div>
          <Trans> • resell or otherwise supply our Service to anyone else without our prior written consent;</Trans>
        </div>
        <div>
          <Trans> • open multiple free/trial accounts;</Trans>
        </div>
        <div>
          <Trans>
            • make use of any additional services which are not meant to be available to you on the plan You have
            subscribed to.
          </Trans>
        </div>
        <div>
          <Trans>
            • abuse, defame, threaten, stalk or harass anyone, or to harm them as defined in any relevant law in any
            jurisdiction;
          </Trans>
        </div>
        <div>
          <Trans>
            • run any network scanning software, spiders, spyware, robots, open relay software or similar software;
          </Trans>
        </div>
        <div>
          <Trans>
            • upload or otherwise introduce any spyware, viruses, worms, trojans, time bombs or bots or any other
            damaging items which could interfere with the Service and Website or anyone else’s, network, device or
            computer system;
          </Trans>
        </div>
        <div>
          <Trans> • use any software or device which may hinder the Service;</Trans>
        </div>
        <div>
          <Trans>
            • attempt to gain unauthorized access to any services other than those to which you have been given express
            permission to access or to impersonate anyone or to try to trick or defraud anyone for any reason (e.g. by
            claiming to be someone you are not).
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`7. FEES`} className="mb-[8px]" />
        <div>
          <Trans>
            The use of our Service requires payment. You are responsible for all charges associated with such use. The
            use of any fee-based versions of the Service is governed by the applicable terms presented at the time of
            purchase on our Website and Application, as well as these Terms.
          </Trans>
        </div>
        <div>
          <Trans>
            Our Service may be billed on a one-time basis, or on a subscription basis or any other payment modality as
            outlined on our Website and Application. If you opt for a subscription, you may be billed in advance on a
            recurring, periodic basis. At the end of each billing cycle, your subscription may automatically renew
            unless you or we cancel it. You can cancel your subscription renewal through your online account management
            page.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`Payment Methods`} className="mb-[8px]" />
        <div>
          <Trans>
            A valid payment method is required to process payment. You must provide us with accurate and complete
            billing information. By submitting such payment information, you may be prompted to authorize us to charge
            all incurred payments and subscription fees to your account.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`Fee Changes`} className="mb-[8px]" />
        <div>
          <Trans>
            We reserve the right to modify prices and payment methods at any time and at our sole discretion. Any
            changes to payments and subscription fees will take effect at the end of the then-current billing cycle. We
            will provide you with reasonable prior notice of any change in fees, giving you the opportunity to terminate
            your subscription before the change becomes effective. Your continued use of the Service after the fee
            change comes into effect implies your agreement to pay the modified fees.
          </Trans>
        </div>
        <div>
          <Trans>
            Please note that fees for access to our Service may vary from user to user due to factors such as regional
            pricing policies, promotions, and taxation modalities.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`8. EDITING, DELETING AND MODIFICATION `}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            We reserve the right in our sole discretion to edit or delete any content appearing on the Service and
            Website or Application at any time and without any prior notice to you.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`9. TERMINATION`} className="mb-[8px]" />
        <div>
          <Trans>
            We may terminate or suspend access to our Service and Website immediately, without prior notice or
            liability, for any reason whatsoever, including, without limitation, if you breach the Terms.
          </Trans>
        </div>
        <div>
          <Trans>
            All provisions of the Terms shall survive termination, including, without limitation, ownership provisions,
            warranty disclaimers, indemnity and limitations of liability.
          </Trans>
        </div>
        <div>
          <Trans>
            Upon termination, your right to use the Service and Website will immediately cease. If you wish to terminate
            your account, you may discontinue using the Website and Service or delete the account by yourself.
          </Trans>
        </div>
        <div>
          <Trans>
            If You are dissatisfied with the Service, the Website or any of our Terms, conditions, and policies, your
            should discontinue using our resources.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`10. NO WARRANTY`} className="mb-[8px]" />
        <div>
          <Trans>
            WE DO NOT GUARANTEE THAT THE WEBSITE OR SERVICE WILL BE ERROR-FREE OR UNINTERRUPTED, OR THAT ANY DEFECTS
            WILL BE CORRECTED, OR THAT YOUR USE OF THE WEBSITE OR SERVICE WILL PROVIDE SPECIFIC RESULTS.
          </Trans>
        </div>
        <div>
          <Trans>
            THE WEBSITE, SERVICE, AND OUR OTHER RESOURCES ARE PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS. ALL
            INFORMATION IS SUBJECT TO CHANGE WITHOUT NOTICE. WE CANNOT ENSURE THAT ANY FILES OR OTHER DATA YOU DOWNLOAD
            FROM THE WEBSITE WILL BE FREE OF VIRUSES OR CONTAMINATION OR DESTRUCTIVE FEATURES.
          </Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>DISCLAIMERS AND LIMITATION OF LIABILITY:</Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>DISCLAIMERS:</Trans>
        </div>
        <div>
          <Trans>
            WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, NON-INFRINGEMENT,
            MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE.
          </Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>DAMAGES:</Trans>
        </div>
        <div>
          <Trans>
            THE ABOVE DISCLAIMER APPLIES TO ANY DAMAGES, LIABILITY OR INJURIES CAUSED BY ANY FAILURE OF PERFORMANCE,
            ERROR, OMISSION, INTERRUPTION, DELETION, DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS,
            COMMUNICATION LINE FAILURE, THEFT OR DESTRUCTION OF OR UNAUTHORIZED ACCESS TO, ALTERATION OF, OR USE,
            WHETHER FOR BREACH OF CONTRACT, TORT, NEGLIGENCE OR ANY OTHER CAUSE OF ACTION.
          </Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>CONTENT AND LEGAL RIGHTS:</Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>CONTENT CONTROL:</Trans>
        </div>
        <div>
          <Trans>
            WE ARE NOT RESPONSIBLE FOR ANY CONTENT THAT YOU UPLOAD TO THE SERVICE, NOR DO WE DO VERIFY OR CONTROL SUCH
            CONTENT.
          </Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>LEGAL RIGHTS:</Trans>
        </div>
        <div>
          <Trans>
            WE DO NOT VERIFY YOUR LEGAL RIGHTS TO THE CONTENT THAT YOU UPLOAD TO THE SERVICE, NOR WILL WE PROVIDE YOU
            WITH ANY CONFIRMATION OF YOUR LEGAL RIGHTS TO ANY CONTENT OR OFFER ANY LEGAL SUPPORT.
          </Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>UPLOADING CONTENT:</Trans>
        </div>
        <div>
          <Trans>
            WHEN YOU UPLOAD YOUR CONTENT, YOU AUTOMATICALLY ATTEST THAT THIS CONTENT IS LEGAL AND THAT YOU HAVE ALL THE
            NECESSARY LEGAL RIGHTS TO USE IT, UPLOAD IT AND THAT SUCH CONTENT DOES NOT VIOLATE ANY RIGHTS OF THIRD
            PARTIES.
          </Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>LEGAL DOCUMENTS:</Trans>
        </div>
        <div>
          <Trans>
            WE WILL NOT PROVIDE YOU OR ANY OF YOUR REPRESENTATIVES WITH ANY LEGAL DOCUMENTS RELATED TO CONTENT YOU
            UPLOADED TO THE SERVICE.
          </Trans>
        </div>
        <div className="mt-1 font-inter-bold">
          <Trans>COMPATIBILITY:</Trans>
        </div>
        <div>
          <Trans>
            EARLY VERSIONS OF OUR SOFTWARE MAY NOT BE BACKWARD COMPATIBLE WITH FUTURE VERSIONS OF OUR PRODUCT.
          </Trans>
        </div>
        <div>
          <Trans>LIMITATION OF LIABILITIES </Trans>
        </div>
        <div>
          <Trans>
            Except where prohibited by law, in no event we will be liable to you for any indirect, consequential,
            exemplary, incidental or punitive damages, including lost profits, even if we have been advised of the
            possibility of such damages.
          </Trans>
        </div>
        <div>
          <Trans>
            If, notwithstanding the other provisions of these Terms, we are found to be liable to you for any damage or
            loss which arises out of or is in any way connected with your use of the Service, Website, our liability
            shall in no event exceed the greater of:
          </Trans>
        </div>
        <div>
          <Trans>
            • the total amount you paid for the Service within 1 (one) month prior to the date of the initial claim made
            against us;
          </Trans>
        </div>
        <div>
          <Trans> • an equivalent of USD100.</Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`11. LIMITATION OF LIABILITIES`}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            Except where prohibited by law, in no event we will be liable to you for any indirect, consequential,
            exemplary, incidental or punitive damages, including lost profits, even if we have been advised of the
            possibility of such damages.
          </Trans>
        </div>
        <div>
          <Trans>
            If, notwithstanding the other provisions of these Terms, we are found to be liable to you for any damage or
            loss which arises out of or is in any way connected with your use of the Service, Website, our liability
            shall in no event exceed the greater of:
          </Trans>
        </div>
        <div>
          <Trans>
            the total amount you paid for the Service within 1 (one) month prior to the date of the initial claim made
            against us;
          </Trans>
        </div>
        <div>
          <Trans>an equivalent of USD100. </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`12. THIRD PARTY PRODUCTS AND SERVICES `}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            The Service and Website may contain references or links to third-party resources, including (but not limited
            to) information, content, products, or services, that we do not own or control. Any such references or links
            are provided only as a convenience and should be used at your own risk.
          </Trans>
        </div>
        <div>
          <Trans>These Terms apply only to our Service, Website and Application.</Trans>
        </div>
        <div>
          <Trans>
            In addition, third parties may offer promotions related to your access and use of the Service. We do not
            endorse or assume any responsibility for any such resources or promotions including in relation to any
            collection of your personal data. If you access any such resources or participate in any such promotions,
            you do so at your own risk, and you understand that the Terms do not apply to your dealings or relationships
            with any third parties. You expressly relieve us of any and all liability arising from your use of any such
            resources or participation in any such promotions.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`13. FORCE MAJEURE`} className="mb-[8px]" />
        <div>
          <Trans>
            We shall not be liable for any loss or damage arising from any event beyond our reasonable control, which
            may result in the suspension of the performance of our obligations under these Terms or ceasing to provide
            access to and use of the Services that may be described herein. This includes but is not limited to events
            like flood, pandemic, extraordinary weather conditions, earthquake, act of God, fire, war, insurrection,
            malicious acts of damage, riot, labor dispute, accident, actions of any government or regulator (including
            any actions that restrict or suspend our ability to provide access to and use of the Services, Website,
            Application), communication failure, power and electricity supply failure, equipment or software
            malfunction, or any other cause beyond our reasonable control.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`14. GOVERNING LAW `}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            These Terms shall be interpreted, construed and enforced in accordance with the laws of United Arab Emirates
            without regard to its conflict of law provisions.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`15. DISPUTE RESOLUTION`}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            Both parties commit to exerting their utmost efforts to address and settle any prospective disputes (the
            “Dispute”) through amicable, good faith discussions. Should a Dispute emerge, you are obliged to contact us
            initially, allowing us an opportunity to address the matter before engaging in formal Dispute resolution
            proceedings.
          </Trans>
        </div>
        <div>
          <Trans>
            Such good faith discussions require, at a minimum, that the aggrieved party provide a written notice to the
            other party specifying the nature and details of the Dispute. The party receiving such notice shall have
            thirty (30) days to respond to the notice. Within sixty (60) days after the aggrieved party sent the initial
            notice, the parties shall meet and confer in good faith on an agreed manner to try to resolve the Dispute.
            If the parties are unable to resolve the Dispute within ninety (90) days after the aggrieved party sent the
            initial notice, the parties may submit the Dispute to arbitration according to the Arbitration clause set
            forth below.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`16. ARBITRATION CLAUSE`}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            You and us agree that any Dispute that cannot be resolved through the procedures set forth above will be
            resolved through binding arbitration under the auspices of the INTERNATIONAL ARBITRATION CHAMBER OF PARIS (6
            avenue Pierre 1er de Serbie, 75116 Paris, tel: 01.42.36.99.65), in accordance with its rules, which the
            parties acknowledge and accept.
          </Trans>
        </div>
        <div>
          <Trans>The place of arbitration shall be Paris, France.</Trans>
        </div>
        <div>
          <Trans>The language of the arbitration shall be French.</Trans>
        </div>
        <div>
          <Trans>There will be one arbitrator.</Trans>
        </div>
        <div>
          <Trans>
            The arbitrator shall have experience adjudicating matters involving Internet technology, software
            applications and Intellectual property rights.
          </Trans>
        </div>
        <div>
          <Trans>The arbitrator’s award of damages must be consistent with these Terms.</Trans>
        </div>
        <div>
          <Trans>
            The prevailing party will be entitled to an award of their reasonable attorney’s fees and costs. Except as
            may be required by law, neither a party nor its representatives may disclose the existence, content, or
            results of any arbitration hereunder without the prior written consent of both parties.
          </Trans>
        </div>
        <div>
          <Trans>
            By accepting these Terms you acknowledge and agree that you and us are each waiving the right to a trial by
            jury or to participate as a plaintiff or class member in any purported class action or representative
            proceeding. Further, unless both parties otherwise agree in writing, the arbitrator may not consolidate more
            than one person’s claims and may not otherwise preside over any form of any class or representative
            proceeding.
          </Trans>
        </div>
        <div>
          <Trans>
            You agree that you will not be permitted to obtain an injunction or other equitable relief of any kind, such
            as any court or other action that may interfere with or prevent the normal operation or development or
            exploitation of the Interface, or any other website, application, content, submission, product, service, or
            intellectual property owned, licensed, used or controlled by us.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`17. SEVERABILITY`} className="mb-[8px]" />
        <div>
          <Trans>
            Should any clause of these Terms be found unlawful, void, or unenforceable, it will still be enforced to the
            maximum extent permitted by relevant law. Any portion deemed unenforceable will be considered separate from
            these Terms, without affecting the validity or enforceability of the remaining clauses.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`18. ASSIGNMENT`} className="mb-[8px]" />
        <div>
          <Trans>
            We can assign these Terms and the Privacy Policy, without seeking your prior agreement, to any entity,
            including successors related to any business. On the other hand, you cannot delegate or pass on any rights
            or duties under these Terms without our explicit written approval.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`19. ENTIRE AGREEMENT`}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            These Terms, together with the Privacy Policy and any Disclaimer we may display on the Application,
            represent the full understanding and agreement between you and us concerning your use of the Service,
            Website, Application. They replace all prior or current dialogues, agreements, and propositions, whether
            spoken or written, between both parties. This includes previous versions of these Terms. Our lack of
            insistence on or enforcement of any provision hereof should not be seen as a relinquishment of that
            provision.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`20. LANGUAGE`} className="mb-[8px]" />
        <div>
          <Trans>
            These Terms have been prepared in English and may be translated into other languages for convenience only.
            In the event of any inconsistency or ambiguity between the English version and any translated version, the
            English version shall prevail.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text
          family="inter-bold"
          type="s18px-h20px"
          color="primary"
          text={t`21. CHANGES TO THESE TERMS`}
          className="mb-[8px]"
        />
        <div>
          <Trans>
            We reserve the right, at our sole discretion, to change these Terms from time to time. Should we make any
            changes, we will notify you by updating the date at the top of the Terms and by maintaining an updated
            version of the Terms within the Service, Website and Application.
          </Trans>
        </div>
        <div>
          <Trans>
            All changes will become effective on the day they are posted. Your continued use of the Service, Website,
            Application after such changes will constitute your acceptance of the updated Terms.
          </Trans>
        </div>
        <div>
          <Trans>
            Should You disagree with any modifications to these Terms, you must cease all activities within the Service,
            Website and Application.
          </Trans>
        </div>
      </div>
      <div className={styles.text_block}>
        <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`22. FEEDBACK`} className="mb-[8px]" />
        <div>
          <Trans>
            The Company may provide you with tools to submit bug reports, questionnaires, enhancement requests, issue
            reports, and/or support information (the “Feedback”). We may solicit this Feedback from you through web
            questionnaires, bug report forms, or other means that you might choose to engage in.
          </Trans>
        </div>
        <div>
          <Trans>
            You acknowledge and agree that we may contact you occasionally for this purpose, and you hereby grant your
            consent to receive such communications.
          </Trans>
        </div>
        <div>
          <Trans>
            All communications between you and us shall remain confidential, if not expressly agreed as non-confidential
            during the course of exchange.
          </Trans>
        </div>
        <div>
          <Trans>
            You commit not to share this Feedback with any third party. Furthermore, you hereby assign to the Company
            all rights, title, and interest in and to any Feedback, without any expectation of compensation or other
            obligations from our side.
          </Trans>
        </div>
        <div>
          <Trans>
            You understand and concur that your participation in providing Feedback is voluntary and does not establish
            any legal partnership, agency, or employment relationship between you and the Company.
          </Trans>
        </div>
        <div className={styles.text_block}>
          <Text family="inter-bold" type="s18px-h20px" color="primary" text={t`23. CONTACT US`} className="mb-[8px]" />
          <div>
            <Trans>
              If you have any questions about these Terms of Service, please contact us by email:&#160;
              <a className="text-primary" href="mailto: legal@watermarked.io">
                legal@watermarked.io
              </a>
            </Trans>
          </div>
        </div>
      </div>
    </div>
  );
};
