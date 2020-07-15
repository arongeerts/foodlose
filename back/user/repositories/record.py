import datetime

from helpers.aws.dynamo import DynamoDB
from config import Config
from exceptions import RecordNotExistsException, MissingInputException
from model.record import Record, Intake, Sport, BaseRecord

DATE_FORMAT = "%Y-%m-%dT%H:%M:%S"

class RecordRepository:
    config = Config()

    def __init__(self):
        self.records_table_name = self.config.get("DYNAMODB_RECORD_TABLE")
        self.dynamo = DynamoDB()

    def save(self, user_id: str, record: Record):
        dynamo_item = {
            "user": {"S": user_id},
            "record_date": {"S": record.record_date},
            "perimeter_arm": {"N": record.perimeter_arm},
            "perimeter_cut": {"N": record.perimeter_cut},
            "perimeter_belly": {"N": record.perimeter_belly},
            "perimeter_leg": {"N": record.perimeter_leg},
            "perimeter_hips": {"N": record.perimeter_hips},
            "intakes": {"L": list(map(lambda i: {"S": i.description, "N": i.calories}, record.intakes))},
            "intake_score": {"N": record.intake_score},
            "sports": {"L": list(map(lambda s: {"S": s.description}, record.sports))},
            "sports_score": {"N": record.sports_score},
            'meta_timestamp': {'S': datetime.datetime.now().strftime(DATE_FORMAT)}
        }
        self.dynamo.put_item(table=self.records_table_name, item=dynamo_item)

    def get(self, user_id: str, record_date: str) -> Record:
        if not record_date:
            raise MissingInputException("record_date")
        if not user_id:
            raise MissingInputException("user_id")

        key = {"user": {"S": user_id}, "record_date": {"S": record_date}}
        item = self.dynamo.get_item(table=self.records_table_name, key=key)
        if not item:
            raise RecordNotExistsException()

        return Record(
            record_date=item["record_date"]["S"],
            perimeter_arm=item["perimeter_arm"]["N"],
            perimeter_cut=item["perimeter_cut"]["N"],
            perimeter_belly=item["perimeter_belly"]["N"],
            perimeter_leg=item["perimeter_leg"]["N"],
            perimeter_hips=item["perimeter_hips"]["N"],
            intakes=list(map(lambda i: Intake(description=i["description"]["S"],
                                              calories=i["calories"]["N"]),
                             item["intakes"]["L"])),
            intake_score=item["intake_score"]["N"],
            sports=list(map(lambda i: Sport(description=i["description"]["S"]),
                            item["intakes"]["L"])),
            sports_score=item["sports_score"]["N"]
        )

    def delete(self, user_id: str, date: str):
        key = {"user": {"S": user_id}, "record_date": {"S": date}}
        self.dynamo.delete_item(table=self.records_table_name, key=key)

    def list(self, user_id: str, from_date=datetime.date.min, to_date=datetime.date.max):
        condition = "record_date BETWEEN :from_date AND :to_date"
        condition_attributes = {
            ":from_date": {"S": from_date.strftime("%Y-%m-%d")},
            ":to_date": {"S": to_date.strftime("%Y-%m-%d")},
        }

        response = self.dynamo.query_by_key(table=self.records_table_name,
                                            key_name="user",
                                            key_value=user_id,
                                            condition=condition,
                                            condition_attributes=condition_attributes)
        return list(map(lambda item: BaseRecord(
            record_date=item["record_date"]["S"],
            perimeter_arm=item["perimeter_arm"]["N"],
            perimeter_cut=item["perimeter_cut"]["N"],
            perimeter_belly=item["perimeter_belly"]["N"],
            perimeter_leg=item["perimeter_leg"]["N"],
            perimeter_hips=item["perimeter_hips"]["N"],
            intake_score=item["intake_score"]["N"],
            sports_score=item["sports_score"]["N"]
        ), response))
