Database
Any type of RDMS can be used for currently designed DB schema. There is no restriction on deployment, as long as it is accessible from backend api.
Currently only Connector template details is stored in DB. In future, it will also include users/roles tables.
All other data is directly managed using Kafka Connect and KSQL REST API.
Source Connectors management
General idea is that frontend will provide source connector management features. Those features will utilze following endpoints:
/connectors - these API endpoints will connect to Kafka Connect REST API to perform CRUD operations on source connectors.
/connectorPlugins - These API endpoints will connect to Kafka Connect REST API to retrieve list of available connectors. And also it will provide ability to validate configuration for specific connector. It will be used before creating the Connector.
/connectorTemplates - It will store the source connector templates with some default values. In future this is expected to be managed by specific user roles. It will help to simplify process of creating and configuring new source connectors.
Data Processing
General idea is that frontend will provde editor for creating KSQL statements and queries. It will enhance user experience by retrieving available topics, streams, and tables, including their schema. This will allow using auto-complete features and do basic validation on frontend. Following API endpoints will be used:
/dataProcessing - These will use KSQL REST API to perform required opertations.
Error handling
Errors will be handled from Kafka REST API and propagated to API consumers.



Q & A
Q: Can the API validate the job parameters - ex how do we avoid defining two jobs that push data to the same topic or overwrite existing ksqldb tables. Can the api do all the validation, or we have to rely on handling error codes from kafka connect or ksqldb?

A: The API will do basic validation, but we will also use Kafka API to validate configurations, and propagate errors.

Q: Are API endpoints synchronous or async - are the jobs created/updated in Kafka Connect/ksqldb as the user defines them, or we need to track status for a job definition (ex pending, created, started, failed, removed, etc)
A: API Requests will be synchronous
